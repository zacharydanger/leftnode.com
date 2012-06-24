---
layout: post
title: "Faster Symfony2 Tests"
permalink: /entry/faster-symfony2-tests.html
comments: false
author: Vic Cherubini
---

I started using Symfony2 as part of my 2012 resolution to [love my non perfect code](/entry/content-with-code-learning-to-love-my-non-perfect-code.html). I have had a great time using it.
It is very complete, well written, and there is a huge community for it. The documentation is generally good, however, I have spent a lot of time digging around the source code to see how something worked.
This article will discuss a technique to write much faster tests for your controllers.

Automated testing is very important to me. All of the code I write is tested by unit and functional tests. Symfony2 makes it very easy to write functional tests for your application.
Symfony2 provides a library that acts as a HTTP client to drive your application. You can test the output of the responses from those requests. While these functional tests are
essential to writing a complete test suite, they are slow and cumbersome to write. Because they are making simulated HTTP requests, they invoke Symfony2's frontend router and dispatcher.

It struck me as odd that it was difficult (and not outlined anywhere in the Symfony2 manual) to write faster tests for a controller. It is very difficult to write a true unit test
for your controller because you have to mock and stub a lot of depended on components (DOCs), but surely there must be a way to write faster tests? For the purpose of this article, I will
refer to these faster tests as unit tests because they test a specific unit of a controller. While they may use actual DOCs and can communicate with external systems, they are not making full HTTP requests.

### Bootstrapping the Controller
To begin, you need a test class that extends Symfony2's `Symfony\Bundle\FrameworkBundle\Test\WebTestCase` class so you can create a `Symfony\Bundle\FrameworkBundle\Client` object with
`static::createClient()`. You need a client so you can get access to the kernel and container which you will use to bootstrap the controller.

    <?php

    namespace Acme\DemoBundle\Tests\Unit\Controller;

    use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

    class ControllerTest extends WebTestCase
    {

        public function testControllerAction()
        {
            $client = static::createClient();
        }

    }

After creating a client, you need to use the container to inject `Symfony\Component\HttpFoundation\Request` object.

    <?php

    namespace Acme\DemoBundle\Tests\Unit\Controller;

    use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
    use Symfony\Component\HttpFoundation\Request;

    class ControllerTest extends WebTestCase
    {

        public function testControllerAction()
        {
            $client = static::createClient();
            $container = $client->getKernel()
                ->getContainer();

            $request = new Request;
            $request->headers->set('Accept', 'application/json');
            $request->server->set('REMOTE_ADDR', '127.0.0.1');

            $container->set('request', $request);
        }

    }

### Complete Test

From this point, creating the controller is simple.

    <?php

    namespace Acme\DemoBundle\Tests\Unit\Controller;

    use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
    use Symfony\Component\HttpFoundation\Request;

    class ControllerTest extends WebTestCase
    {

        public function testControllerAction()
        {
            $client = static::createClient();
            $container = $client->getKernel()
                ->getContainer();

            $request = new Request;
            $request->headers->set('Accept', 'application/json');
            $request->server->set('REMOTE_ADDR', '127.0.0.1');

            $container->set('request', $request);

            $controller = new \Acme\DemoBundle\Controller\PageController;
            $controller->setContainer($this->container);

            $response = $controller->readAction();

            $this->assertEquals(200, $response->getStatusCode());
            $this->assertRegExp('/foo/i', $response->getContent());
        }

    }

By adding the request to the container and then injecting the container to the controller, you can call `$this->getRequest()` in the controller to get the request you just constructed.
When writing your controllers, it is best to not use the `public function readAction(Request $request)` signature and to get the request from `$this->getRequest()`.

Because Symfony2 requires your controller to return a `Symfony\Component\HttpFoundation\Response` object, you can directly access its public API to test that the controller did what you thought it would.

### Keeping Things DRY

Writing all of the code above for every test is undesireable and a violation of the Don't Repeat Yourself (DRY) principle for other tests. Wrapping it up into a few methods in a base test suite class is simple.

    <?php

    namespace Acme\DemoBundle\Tests\Unit\Controller;

    use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
    use Symfony\Component\HttpFoundation\Request;

    class BaseControllerTestCase extends WebTestCase
    {

        protected $client = null;
        protected $container = null;

        public function setUp()
        {
            $this->client = static::createClient();

            $this->container = $this->client
                ->getKernel()
                ->getContainer();
        }

        /**
         * Builds a Controller object and the request to satisfy it. Attaches the request
         * to the object and to the container.
         *
         * @param string The full path to the Controller class.
         * @param array An array of parameters to pass into the request.
         * @return Controller The built Controller object.
         */
        protected function createController($controllerClass,
            array $parameters=array(), array $query=array())
        {
            $request = $this->createWebRequest();
            $request->request->add($parameters);
            $request->query->add($query);

            $this->container
                ->set('request', $request);

            $controller = new $controllerClass;
            $controller->setContainer($this->container);

            return($controller);
        }

        /**
         * Creates a new Request object and hydrates it with the proper values to make
         * a valid web request.
         *
         * @return Request The hydrated Request object.
         */
        protected function createWebRequest()
        {
            $request = new Request;
            $request->headers->set('Accept', 'application/json');
            $request->server->set('REMOTE_ADDR', '127.0.0.1');

            return($request);
        }

    }

The `createController()` method adds two new parameters: one to set POST/PUT parameters to the request, and one to provide GET query parameters to the request.
Using the `createController()` method in your tests is simple.

    <?php

    namespace Acme\DemoBundle\Tests\Unit\Controller;

    use Acme\DemoBundle\Tests\Unit\Controller\BaseControllerTestCase;

    class PageControllerTest extends BaseControllerTestCase
    {

        public function testReadAction()
        {
            $controllerName = 'Acme\DemoBundle\Controller\PageController';
            $controller = $this->createController($controllerName);

            $response = $controller->readAction();

            $this->assertEquals(200, $response->getStatusCode());
            $this->assertRegExp('/foo/i', $response->getContent());
        }

    }

### Conclusion
The biggest downside I have seen with this method is that you can not access the Symfony2 Profiler. The Profiler gives you information on how long a controller
took to run and how many queries were executed. You will have to keep tests with the Profiler with your functional test suite.

You will notice that running these tests is very fast. Bypassing all of the Symfony2 frontend work and calling the controller method directly really speeds things up.
You still need your functional tests to test your application from an HTTP client, but these really help you test your code quickly.

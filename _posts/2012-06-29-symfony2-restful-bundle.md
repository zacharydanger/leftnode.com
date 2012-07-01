---
layout: post
title: "Symfony2 RESTful Bundle"
permalink: /entry/symfony2-restful-bundle.html
comments: false
author: Vic Cherubini
---

I began using the [Symfony2](http://www.symfony.com/) PHP framework at the beginning of 2012 because I did not feel comfortable using Scala for client projects.
I wanted to use a language I was familiar with, PHP, and wanted to use an existing framework rather than having to write my own. Symfony2 was my choice. I went
with Symfony2 because it only works with PHP5.3+ and because of its bundling system.

Symfony2 has turned out to be a great choice. It is very well built, geared towards testing your software, and has a great userbase. With the way I am
[building web applications](/entry/modern-web-application-architecture.html) now, I have two Symfony2 setups for a single application: one for the RESTful API
and one for the frontend web layer.

Symfony2 is really geared out of the box for building frontend web applications and not RESTful APIs. I started searching for a bundle that could help me
and found the [Friends of Symfony RESTful Bundle](https://github.com/FriendsOfSymfony/FOSRestBundle/). It is very thorough but seemed a bit too much for my needs.

This was one case when I wanted to write my own bundle. It would teach me the bundle system and I would have a nice bundle to build RESTful applications on top of.

### BrightmarchRestfulBundle

I wrote and released the [BrightmarchRestfulBundle](https://github.com/brightmarch/BrightmarchRestfulBundle) several months ago and it has worked out very well.

The bundle exists under the namespace `Brightmarch\Bundle\RestfulBundle`. The three most important pieces of it are the `RestfulController` class, the `Entity`
class, and the `HttpException` classes.

#### `HttpException` Classes

HTTP has many different [status codes](http://httpstatus.es/) for the client to determine what happened with its request to the server. Included with this bundle
are some helper `Exception` classes that can be thrown to generate an error to the client. The classes are named for the type of code they represent, and
automatically contain a status code so you do not have to memorize them. The classes are:

* [400 HttpBadSyntaxException](http://httpstatus.es/400)
* [401 HttpUnauthorizedException](http://httpstatus.es/401)
* [404 HttpNotFoundException](http://httpstatus.es/404)
* [405 HttpMethodNotAllowedException](http://httpstatus.es/405)
* [406 HttpNotAcceptableException](http://httpstatus.es/406)
* [409 HttpConflictException](http://httpstatus.es/409)
* [510 HttpNotExtendedException](http://httpstatus.es/510) &#8224;

&#8224; The BrightmarchRestfulBundle will automatically throw this error if it can not render a content type a controller claims it can. For example,
if the server says it can support `application/json` but the view does not exist to render that content type, a 510 Not Extended exception is thrown.

You can simply include one of these classes into your controller with the `use` keyword.

    use Brightmarch\Bundle\RestfulBundle\Exception\HttpNotFoundException;

    // ...
    $user = $this->getEntityManager()
        ->getRepository('CompanyDemoBundle:User')
        ->findById(1);

    if (!$user) {
        throw new HttpNotFoundException("The User with ID 1 could not be found.");
    }

#### `Entity` Class
The `Entity` class included with this bundle provides a solid base class for which you can extend your entities off of. The bundle does not require you to extend
your entities off of this class to build a RESTful API.

The most useful method in the `Entity` class is the `hydrate()` method which lets you define what variables should be loaded from a request payload. It will
automatically call the correct setter methods (should they exist) to set the properties.

    /**
     * @ORM\Entity
     * @ORM\Table(name="task")
     */
    class Task extends Entity
    {
        /**
         * @ORM\Id
         * @ORM\Column(name="id", type="integer")
         * @ORM\GeneratedValue(strategy="SEQUENCE")
         * @ORM\SequenceGenerator(sequenceName="task_id_seq", initialValue=1, allocationSize=1)
         */
        public $id;

        /**
         * @ORM\Column(type="datetime")
         */
        public $created;
        
        /**
         * @ORM\Column(type="datetime") 
         */
        public $updated;

        /**
         * @ORM\Column(type="integer")
         */
        public $status = 0;
        
        /**
         * @ORM\Column(type="string")
         * @Assert\NotBlank()
         * @Assert\MaxLength(128)
         */
        public $name;

        /**
         * @ORM\Column(name="part_number", type="string")
         * @Assert\NotBlank()
         * @Assert\MaxLength(24)
         */
        public $partNumber;

        /**
         * @ORM\Column(name="short_description", type="string", nullable="true")
         * @Assert\MaxLength(128)
         */
        public $shortDescription;

        public function hydrate(array $parameters)
        {
            $this->fetch('name', $parameters)
                ->fetch('part_number', $parameters)
                ->fetch('short_description', $parameters);

            return(true);
        }

        // Setters and getters
    }

You can then build a new entity object and hydrate it from variables in the request ensuring that you do not allow the request to overwrite data it should not.

    public function createTaskAction()
    {
        $request = $this->getRequest();

        // The task variable below would have task[name],
        // task[part_number], task[short_description] fields.
        $task = new Task;
        $task->hydrate((array)$request->get('task'));

        // ...
    }

Aside from that, the `Entity` class is very basic. Most developers end up writing their own base Doctrine Entity classes, and this bundle's class is a great
starting point.


#### `RestfulController` Class
The crux of this bundle is the `RestfulController` class. This class extends Symfony's `Controller` class. The `RestfulController` class provides several key pieces
of functionality to make writing a RESTful API in Symfony easy.


##### Content Negotiation
The biggest piece of functionality that this class provides is content negotiation. Content negotation is the concept in HTTP that a client can accept certain
types of content and that the server can provide content in that type. This is primarily done through the Accept and Content-Type headers.

When making a request to a server, a client will tell the server through the Accept header what content types it can accept in the response. For example, most
browsers give an array of content types that they accept: text/html, application/xml, text/xhtml, text/plain, */*.

Additionally, if a client is sending data to a server through a POST, PUT, or PATCH request, the client will specify the type of that content with the Content-Type
header.

The servers response will contain a Content-Type header with the actual content type of the response payload.

The `RestfulController` class handles all of this for you automatically. When writing a class that extends `RestfulController`, each controller action method
will indicate what types of content it can respond with.

    public function createAction()
    {
        $this->resourceSupports('application/json', 'application/xml', 'text/html');

        // ...
    }

The `resourceSupports()` method takes a variable number of arguments. Each argument should be a valid mime type string. This method tells the controller that
this resource can respond in one of those content types. You must supply a view for each content type that the resource can respond with. If you do not, the 510
Not Extended status code is returned.

The class also handles 406 Not Acceptable response if the client accepts a content type this resource can not support. 

##### View Rendering
The BrightmarchRestfulBundle also handles rendering the correct view based on the Accept header properly. Continuing the example above, if the client accepts
only application/xml and a view.xml.twig view exists, then that view will be rendered and returned to the client with an application/xml Content-Type header.


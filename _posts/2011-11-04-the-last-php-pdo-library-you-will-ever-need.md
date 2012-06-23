---
layout: post
title: "The Last PHP PDO Library You Will Ever Need"
permalink: /entry/the-last-php-pdo-library-you-will-ever-need.html
comments: false
author: Vic Cherubini
---

Despite my best efforts, I have not had a chance to learn Scala like [I wanted to](/entry/i-m-retiring-from-php.html) earlier in the year. I was commissioned to build a large scale web application right after I made the decision to learn a new language and curtail the amount of PHP I was programming. Doing the application in a language other than PHP would have been silly. It was client work, and I could not expect to use it as a way to learn a new language and framework (Scala and Lift). I already had a great PHP toolset I could use (and a new one I ended up writing), so my work with PHP continued.

This new application is the first large scale application I have built for side work in a while, so it gave me the opportunity to try some new ideas I have had with PHP. I am proud of the architecture I built, and look forward to discussing the design decisions I made in future articles. This article discusses my decision to move from using a SQL library to writing straight SQL in my controllers.

The first decision I made was to not use any type of ORM, SQL generation tool, or ActiveRecord style library. That means all of my SQL is hand written (including `INSERT`'s and `UPDATE`'s) and executed through PHP's *excellent* PDO library. I will refer to any library or framework for interacting with a database besides writing straight SQL as an ORM in this article.

I have come full circle with my development. Eleven or twelve years ago when I started with PHP, all SQL was hand written (chock full of SQL-injection attacks, I'm sure) and executed with the PHP mysql library. Then came the Frameworkapoloza and suddenly I was using objects to describe records in a database. After reflecting on this for a while, I determined it is just not for me. Using an ORM feels clunky, slow, vendor-locked, and difficult to debug. Additionally, with any system of size, you are going to have to write some large SQL queries. I feel mixing ORM code and hand-written SQL is ugly. Writing SQL might tie you into specific database software, but using an ORM ties you closely to that ORM software, which is most likely not as stable as the underlying database software. I trust the future of PostgreSQL much more than I do Doctrine or Propel, for example.

I ripped out all of my ORM code and replaced it with pure prepared-PDO. By hand writing all of my SQL queries, I can spot check them for correctness, easily spit out a misbehaving query, and get fast(er) execution speeds. It just feels natural for me.

I do not buy into the argument an ORM lets you switch databases easily. The ORM might facilitate that, but I have never worked on a project of any non-trivial size that after being put into production had its database changed. My fulltime job has a PostgreSQL database with 550+ tables, 220+ stored procedures, and 110 or so triggers. Migrating that to different database software would never happen.

Because PDO can be verbose at times, I wrote the smallest wrapper I could to facilitate some common tasks. You are free to take it and use it for your projects.

    <?php

    class db extends PDO {
  
      public function fetch_all($query, $parameters=array()) {
        $read_stmt = $this->prepare_and_execute($query, $parameters);

        $fetched_rows = $read_stmt->fetchAll(PDO::FETCH_CLASS);
        $read_stmt->closeCursor();

        unset($read_stmt);
        return($fetched_rows);
      }

      public function fetch_one($query, $parameters=array()) {
        $read_stmt = $this->prepare_and_execute($query, $parameters);

        $fetched_row = $read_stmt->fetchObject();
        if (!is_object($fetched_row)) {
          $fetched_row = false;
        }

        $read_stmt->closeCursor();
        unset($read_stmt);
        return($fetched_row);
      }

      public function fetch_column($query, $parameters=array(), $column=0) {
        $column = abs((int)$column);

        $read_stmt = $this->prepare_and_execute($query, $parameters);
        $fetched_column = $read_stmt->fetchColumn($column);

        $read_stmt->closeCursor();
        unset($read_stmt);
        return($fetched_column);
      }
  
      public function modify($query, $parameters) {
        $modify_stmt = $this->prepare_and_execute($query, $parameters);
        return($modify_stmt->rowCount());
      }

      private function prepare_and_execute($query, $parameters=array()) {
        $prep_stmt = $this->prepare($query);
        $prep_stmt->execute($parameters);
        return($prep_stmt);
      }
    }

Here is an example controller action from the aforementioned project that uses it:

    public function action_get_read_metrics() {
      try {
        $this->requires_client_authentication()
          ->parse_report_dates();
      
        $query = "SELECT campaign, COUNT(campaign) AS call_count,
            ROUND(AVG(duration), 1) AS avg_duration FROM client_call
          WHERE client_id = :client_id AND called >= :start_date AND called < :end_date
          GROUP BY campaign ORDER BY call_count DESC";
        $call_metrics = metrics::get_pdo()->fetch_all($query, array(
          'client_id' => $this->client_id,
          'start_date' => $this->start_date->format('Y-m-d'),
          'end_date' => $this->end_date->format('Y-m-d')));
      
        $this->register('models', $call_metrics);
      } catch (Exception $e) {
        $this->handle_exception($e);
      }
    }

Writing code like this just feels more natural to me. It is very fast, easy to read, and very expressive in what it does.

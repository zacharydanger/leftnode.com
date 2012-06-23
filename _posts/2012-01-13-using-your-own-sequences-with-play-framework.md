---
layout: post
title: "Using Your Own Sequences With Play Framework"
permalink: /entry/using-your-own-sequences-with-play-framework.html
comments: false
author: Vic Cherubini
---

I firmly believe the best way to learn something is to entrench yourself deeply into whatever it is you are attempting to learn **and** to use it as much as possible. I am attempting to learn Java and the Play Framework. I am working on a small side project called Accthub that I am building in Play with Java.

Although I am going to be more [content with my code](/entry/content-with-code-learning-to-love-my-non-perfect-code.html) and work within the Play defaults, there are a few things that have bothered me right of the bat with using Hibernate and the JPA. Using Hibernate, Play will automatically migrate your database for you by default. While this is great in a test environment (when I am using a memory only database), it does not sit well with me for production use. I like to have more control over how fields are defined, what indexes are built, and stored procedures created. Fortunately, the auto-migrations can be turned off and I can use [Play Evolutions](http://www.playframework.org/documentation/1.2.4/evolutions). Hibernate also uses a database wide sequence called `hibernate_sequence` which I do not care for. I prefer my tables have their own sequences.

My database of choice is PostgreSQL. I stopped using MySQL in mid-2011 when its many bugs bit me one too many times (we also use Postgres at work and I wanted to become more familiar with it for that reason as well). Unlike MySQL, Postgres does not have an `AUTO_INCREMENT` field attribute. To create a primary key that auto-increments with each insert, you must define a sequence and tell Postgres what table and field you want it to operate on.

Because this is a common task, Postgres makes it even easier during your table definition: if you define a field as type `serial`, Postgres will automatically create a sequence for you named `{table}_{field}_seq`.

My first evolution looks like this:

    # client table schema
 
    # --- !Ups
    CREATE TABLE client (
      id serial NOT NULL,
      created timestamp with time zone NOT NULL,
      updated timestamp with time zone,
      status smallint NOT NULL DEFAULT 0,
      apikey character varying(128) NOT NULL,
      name character varying(64) NOT NULL,
      identifier character varying(16) NOT NULL,
      email character varying NOT NULL,
      lang character varying(12) NOT NULL,
      CONSTRAINT client_pkey PRIMARY KEY (id)
    ) WITH (OIDS=FALSE);

    CREATE INDEX client_status_idx ON client (status);
    CREATE INDEX client_identifier_idx ON client (identifier);
    CREATE INDEX client_email_idx ON client (email);

    # --- !Downs
    SELECT setval('client_id_seq', 1);		
    DROP INDEX client_status_idx;
    DROP INDEX client_identifier_idx;
    DROP INDEX client_email_idx;
    DROP TABLE client;

I executed the evolution and the `client` table and associated `client_id_seq` sequence were created. However, when I went to actually use the model in my controllers, Hibernate was giving the error "could not get next sequence value". I spent a few minutes perusing the [Play Framework Google Group](http://groups.google.com/group/play-framework), [Stackoverflow Play Framework Tag](http://stackoverflow.com/tags/playframework), and the [JPA Annotations documentation](http://www.oracle.com/technetwork/middleware/ias/toplink-jpa-annotations-096251.html) and finally learned how to fix this problem.

First, turn off automatic DDL migrations for JPA. In your application.conf file, add this line:

    jpa.ddl=none
    
Next, rather than extending the `Model` class, your models need to extend the `GenericModel` class. The `Model` class defines the @Id annotation for you, but you need to define it yourself. You can do this by extending `GenericModel` which does not have an @Id annotation.

    @Entity
    @Table(name="client")
    public class Client extends GenericModel { }
    
JPA needs to know which of the fields in the class is the sequenced field and what sequence to use for them. You use the @SequenceGenerator and @GeneratedValue annotations for this.

    @Entity
    @Table(name="client")
    public class Client extends GenericModel {

      @Id
      @SequenceGenerator(name="client_seq", sequenceName="client_id_seq", allocationSize=0)
      @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="client_seq")
      public Long id;
    
    }
    
A bit verbose, but it tells JPA that you are creating a sequence named "client_seq" and it uses the `client_id_seq` sequence in the database. The allocationSize attribute tells JPA what value the sequence begins with. Setting it to 0 means JPA will use the first value of the sequence; the number 1.

Now you can use your model in your controller as you would any other model, and JPA will use that model's own sequence rather than the global `hibernate_sequence`.

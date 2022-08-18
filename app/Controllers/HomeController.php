<?php

namespace App\Controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Controllers\PageController;
use App\Controllers\Model\PeopleController;
use App\Controllers\DB\SqlController;

class HomeController{

    public function index(Request $request, Response $response, $args){
        $page = new PageController();
        $page->setTpl("index");
        return $response;
    }

    public function store(Request $request, Response $response, $args)
    {
        $people = new PeopleController();
        $people->setData($_POST);
        var_dump($people);
        //$people->save();
        
        return $response;
    }

    public function readDb(Request $request, Response $response, $args)
    {
        //$page = new PageController();
        $people = new PeopleController();
        $result = $people->listAll();
        var_dump($result);
        
        // $page->setTpl("index", array(
        //     "fathers" => $fathers,
        //     "children" => $children
        // ));
        return $response;
    }
}


?>
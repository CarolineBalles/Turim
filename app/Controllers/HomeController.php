<?php

namespace App\Controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Controllers\PageController;
use App\Controllers\Model\PeopleController;

class HomeController{

    public function index(Request $request, Response $response, $args){
        $page = new PageController();
        $page->setTpl("index");
        return $response;
    }

    public function store(Request $request, Response $response, $args)
    {
        $contentType = $request->getHeaderLine('Content-Type');

        if (strstr($contentType, 'application/json')) {
            $contents = json_decode(file_get_contents('php://input'), true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $request = $request->withParsedBody($contents);
            }
        }
        
        $json = $request->getParsedBody();
        $people = new PeopleController();
        $json_response = array();

        foreach($json as $father) {
            $newFather = $people->insertFather($father);
            foreach ($father['children'] as $children) {
                $newChildren = $children;
                $newChildren['father_id'] = $newFather['id'];
                $newChildren = $people->insertChildren($newChildren);
            }
            $newFather['children'] = $people->listRelatedChildrens($newFather['id']);
           array_push($json_response, $newFather);
        }

        $payload = json_encode($json_response);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function readDb(Request $request, Response $response, $args)
    {
        $people = new PeopleController();
        $result = $people->listRelationAll();
        $payload = json_encode($result);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }
}


?>
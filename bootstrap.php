<?php

use Slim\Factory\AppFactory;

$route = require __DIR__ .  '/app/Routes/Route.php';

$app = AppFactory::create();

$app->addErrorMiddleware(true, true, true);

$route($app);

$app->run();

?>
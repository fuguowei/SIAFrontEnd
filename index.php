<?php
session_start();

require 'vendor/autoload.php';

$app = new \Slim\Slim([
	'view' => new \Slim\Views\Twig()
]);

// Routes
$app->get('/', function () use($app) {
    $app->render('layout/master.php');
});

// Views
$view = $app->view();
$view->setTemplatesDirectory('app/views');
$view->parserExtensions = [
	new \Slim\Views\TwigExtension()
];

$app->run();

?>
<?php

namespace App\Controllers\Model;

use App\Controllers\DB\SqlController;
use App\Controllers\Model;

class PeopleController extends Model {
    
    public function listAll()
    {
        $sql = new SqlController();
        return $results = $sql->select("SELECT * FROM father a INNER JOIN children b");
    }

    public function listFathers()
    {
        $sql = new SqlController();
        return $sql->select("SELECT * FROM father");
    }

    public function listChildrens()
    {
        $sql = new SqlController();
        return $sql->select("SELECT * FROM children");
    }

    public function listRelatedChildrens($father_id)
    {
        $sql = new SqlController();
        return $sql->select("SELECT * FROM children c WHERE c.father_id = $father_id");
    }

    public function listRelationAll() {
        $fathers = $this->listFathers();
        $relation = array();        
        foreach ($fathers as $father) {
           $father['children'] = $this->listRelatedChildrens($father['id']);
           array_push($relation, $father);
        }
        return $relation;
    }

    /**
     * Inserts a new Father and return this record if is the last.
     */
    public function insertFather($father) 
    {
        $name = $father['name'];
        $sql = new SqlController();
        $sql->select("INSERT INTO father (`name`) VALUE ('$name')");
        return $this->getLastFather();
    }

    /**
     * Returns Last Father Created
     */
    public function getLastFather()
    {
        $sql = new SqlController();
        $fathers = $sql->select("SELECT * FROM father ORDER BY id DESC LIMIT 1");
        return $fathers[0];
    }

    /**
     * Inserts a new Children and return this record if is the last.
     */
    public function insertChildren($children) 
    {
        $father_id = $children['father_id'];
        $name = $children['name'];
        $sql = new SqlController();
        $sql->select("INSERT INTO children (`father_id`, `name`) VALUE ($father_id, '$name')");
        return $this->getLastChildren();
    }

    /**
     * Returns Last Children Created
     */
    public function getLastChildren()
    {
        $sql = new SqlController();
        $childrens = $sql->select("SELECT * FROM children ORDER BY id DESC LIMIT 1");
        return $childrens[0];
    }
}

?>
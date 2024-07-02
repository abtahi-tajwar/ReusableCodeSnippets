<?php
function listWithPaginationAndFilter(
    Model $model,
    Request $request,
    array $with,
    $filterMapping = ['search' => [], 'filterBy' => [], 'customWhere' => [], 'customWhereIn' => []]
) {
    $limit = 10;
    $page = 1;
    $searchBy = null;
    $searchString = null;
    $whereInRelations = [];
    $whereIn = [];

    if ($request->has('limit')) {
        $limit = $request->input('limit');
    }
    if ($request->has('page')) {
        $page = $request->input('page');
    }
    if ($request->has('searchBy')) {
        if (array_key_exists($request->input('searchBy'), $filterMapping['search'])) {
            $keyVal = $filterMapping['search'][$request->input('searchBy')];

            $searchBy = $keyVal ? $filterMapping['search'][$request->input('searchBy')] : $request->input('searchBy');
        }
    }
    if ($request->has('searchString')) {
        $searchString = $request->input('searchString');
    }

    $where = [];

    // Setting where array criterias for search
    if (!is_null($searchBy) && !is_null($searchString)) {
        array_push($where, [$searchBy, 'like', "%$searchString%"]);
    }

    // Setting where criterias for filter
    foreach ($filterMapping['filterBy'] as $key => $f) {
        if ($request->has($key)) {
            $queryValue = $request->input($key);
            $queryValueArray = explode(",", $request->input($key));
            $keyValTemp = !is_null($f) ? $f : $key;
            $keyVal = explode(".", $keyValTemp);
            if (count($keyVal) == 1) {
                array_push($where, [$keyVal[0], $queryValueArray]);
            } else {
                array_push($whereInRelations, [$keyVal[0], $keyVal[1], $queryValueArray]);
            }
        }
    }
    // return $whereInRelations;

    // $result = $model::with($with)->where($where)->whereRelationIn()->paginate($limit, ['*'], 'page', $page);
    $alteredModel = $model::with($with);
    foreach ($where as $w) {
        $alteredModel = $alteredModel->whereIn($w[0], $w[1]);
    }

    // If user wants to add custom where
    // This will also handle whereRelation with
    if (array_key_exists('customWhere', $filterMapping)) {
        foreach ($filterMapping['customWhere'] as $customWhere) {
            $key = null;
            $tempKey = null;
            $operator = null;
            $value = null;
            $relation = null;
            if (count($customWhere) == 2) {
                $tempKey = $customWhere[0];
                $value = $customWhere[1];
            } else {
                $tempKey = $customWhere[0];
                $operator = $customWhere[1];
                $value = $customWhere[2];
            }

            if (strpos($customWhere[1], '.')) {
                $extracted = explode($tempKey, ".");
                $relation = $extracted[0];
                $key = $extracted[1];
            } else {
                $key = $tempKey;
            }

            if (!is_null($relation)) {
                if (!is_null($operator)) {
                    $alteredModel = $alteredModel->whereRelation($relation, $key, $operator, $value);
                } else {
                    $alteredModel = $alteredModel->whereRelation($relation, $key, $value);
                }
            } else {
                if (!is_null($operator)) {
                    $alteredModel = $alteredModel->where($key, $value);
                } else {
                    $alteredModel = $alteredModel->where($key, $operator, $value);
                }
            }
        }
    }
    // If user wants to add custom whereIn
    // This will also handle orWhereRelation with
    if (array_key_exists('customWhereIn', $filterMapping)) {
        foreach ($filterMapping['customWhereIn'] as $customWhereIn) {
            $key = null;
            $tempKey = null;
            $operator = null;
            $value = null;
            $relation = null;
            if (count($customWhereIn) == 2) {
                $tempKey = $customWhereIn[0];
                $value = $customWhereIn[1];
            } else {
                $tempKey = $customWhereIn[0];
                $operator = $customWhereIn[1];
                $value = $customWhereIn[2];
            }

            if (strpos($customWhereIn[1], '.')) {
                $extracted = explode($tempKey, ".");
                $relation = $extracted[0];
                $key = $extracted[1];
            } else {
                $key = $tempKey;
            }

            if (!is_null($relation)) {
                if (!is_null($operator)) {
                    $alteredModel = $alteredModel->orWhereRelation($relation, $key, $operator, $value);
                } else {
                    $alteredModel = $alteredModel->orWhereRelation($relation, $key, $value);
                }
            } else {
                if (!is_null($operator)) {
                    $alteredModel = $alteredModel->whereIn($key, $value);
                } else {
                    $alteredModel = $alteredModel->whereIn($key, $operator, $value);
                }
            }
        }
    }
    foreach ($whereInRelations as $relation) {
        $alteredModel = $alteredModel->orWhereRelation($relation[0], $relation[1], $relation[2]);
    }
    $result = $alteredModel->paginate($limit, ['*'], 'page', $page);
    return $result;
}
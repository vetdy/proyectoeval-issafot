<?php

namespace App\Services;

class SortService
{
    public function sortNombre($usuarios)
    {
        $this->mergeSort($usuarios, 0, count($usuarios) - 1);
        return $usuarios;
    }

    function merge(&$arr, $left, $middle, $right)
    {

        $leftArrayLength = $middle - $left + 1;
        $rightArrayLength = $right - $middle;


        $leftArray = array_slice($arr, $left, $leftArrayLength);
        $rightArray = array_slice($arr, $middle + 1, $rightArrayLength);
        $i = 0;
        $j = 0;
        $k = $left;

        while (
            $i < $leftArrayLength
            && $j < $rightArrayLength
        ) {
            if (strcmp($leftArray[$i]['nombre_usuario'],$rightArray[$j]['nombre_usuario'])<=0) {
                $arr[$k] = $leftArray[$i];
                $i++;
            } else {
                $arr[$k] = $rightArray[$j];
                $j++;
            }
            $k++;
        }

        while ($i < $leftArrayLength) {
            $arr[$k] = $leftArray[$i];
            $i++;
            $k++;
        }

        while ($j < $rightArrayLength) {
            $arr[$k] = $rightArray[$j];
            $j++;
            $k++;
        }
    }

    function mergeSort(&$arr, $left, $right)
    {
        if ($left < $right) {


            $middle = $left + (int)(($right - $left) / 2);

            $this->mergeSort($arr, $left, $middle);
            $this->mergeSort($arr, $middle + 1, $right);

            $this->merge($arr, $left, $middle, $right);
        }
    }
}

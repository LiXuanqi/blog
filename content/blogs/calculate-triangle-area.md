---
title: Calculate the area of triangle
date: 2019-07-16
description: "Introduce how to 👨🏻‍💻 calculate the area of triangle in cartesian coordinate system."
tags: ["Algorithm", "Math"]
visible: true
---

In algorithm questions, knowing how to calculate the area of the triangle makes problems easy.

[Leetcode 1037. Valid Boomerang](https://leetcode.com/problems/valid-boomerang/)

[Leetcode 812. Largest Triangle Area](https://leetcode.com/problems/largest-triangle-area/)

## Calculate area

In an algorithm problem, we usually use (x, y) to represent a point in Cartesian coordinate system. Given three points, how can we calculate the area? we need to know the concept of `Vector product` firstly.

## Vector product

![image](https://user-images.githubusercontent.com/24699211/61271685-2455aa80-a75a-11e9-870e-908e1cffa43b.png)

As shown in the figure, the $|a \times b|$ represents the area of the parallelogram combined with Vector a and Vector b. If we just want to get the area of the triangle, it's **half**.

## How to calculate vector product?

![image](https://user-images.githubusercontent.com/24699211/61273020-5ae0f480-a75d-11e9-990f-5047852b3993.png)

## Formula

Given 4 points:

$A(x_a,y_a) \ B(x_b, y_b) \ C(x_c,y_c) \ O(0,0)$

According to vector calculation, we know:

$\vec{AB}=\vec{AO} + \vec{OB} = \vec{OB} - \vec{OA} = ((x_b-x_a), (y_b-y_a))$

$\vec{AC} = \vec{OC} - \vec{OA} = ((x_c - x_a), (y_c - y_a))$

so the area of ABC:

$\Delta_{ABC}=1 / 2 \times | \vec{AB} \times \vec{AC} |$

and

$\vec{AB} \times \vec{AC} \\ = |(x_b - x_a) \times (y_c - y_a) - (y_b -y_a) \times (x_c - x_a)| \\ = |(x_a \times y_b + x_b \times y_c + x_c \times y_a) - (x_c \times y_b + x_b \times y_a - x_a \times y_c)|$

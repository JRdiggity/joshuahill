﻿"use strict";

var canvas = document.getElementById("scene");
var ctx = canvas.getContext("2d");
var particles = [];

function drawScene() {
    canvas.width = png.width * 3;
    canvas.height = png.height * 3;
    ctx.drawImage(png, 0, 0);
    var my_gradient = ctx.createLinearGradient(0, 170, 170, 0);
    my_gradient.addColorStop(0, "teal");
    my_gradient.addColorStop(0.3, "teal");
    my_gradient.addColorStop(0.5, "teal");
    my_gradient.addColorStop(0.7, "teal");
    my_gradient.addColorStop(0.9, "teal");
    ctx.fillStyle = my_gradient;
    my_gradient.addColorStop(1, "teal");

    ctx.fillStyle = my_gradient;
    var data = ctx.getImageData(0, 0, png.width, png.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var y = 0, y2 = data.height; y < y2; y++) {
        for (var x = 0, x2 = data.width; x < x2; x++) {
            var p = y * 4 * data.width + x * 4;
            if (data.data[p + 3] > 129) {
                var particle = {
                    x0: x,
                    y0: y,
                    x1: png.width / 2,
                    y1: png.height / 2,
                    speed: Math.random() * 4 + 2,
                    color: "rgb(" + data.data[p] + "," + data.data[p + 1] + "," + data.data[p + 2] + ")"
                };
                TweenMax.to(particle, particle.speed, {
                    x1: particle.x0,
                    y1: particle.y0,
                    delay: y / 30,
                    ease: Elastic.easeOut
                });
                particles.push(particle);
            }
        }
    }
    requestAnimationFrame(render);
}
var render = function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0, j = particles.length; i < j; i++) {
        var particle = particles[i];
        //uncomment if you want to use image colors instead of gradient
        //ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x1 * 3, particle.y1 * 3, 2, 2);
    }
    requestAnimationFrame(render);
};

var clearFrame = function clearFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = [];
    drawScene();
};

var png = new Image();
png.onload = drawScene;
png.src = "data:image/png;base64,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";


var status = "";
var objects = [];

function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded(){
    console.log("Model Loaded Successfully!");
    status = true;
    objectDetector.detect(img, gotresult);
}

function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
    console.log(results);
    objects = results;
    }
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#ff0000");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke("black");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
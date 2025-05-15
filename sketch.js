// Variáveis globais simplificadas
let drones = [];
let sensores = [];
let caminhoes = [];

function setup() {
  createCanvas(800, 400);
  
  // Criar 2 drones
  for (let i = 0; i < 2; i++) {
    drones.push({
      x: random(100, 350),
      y: random(50, 150),
      speed: random(1, 2),
      angle: random(TWO_PI)
    });
  }
  
  // Criar 3 sensores
  for (let i = 0; i < 3; i++) {
    sensores.push({
      x: random(50, 350),
      y: random(200, 350),
      umidade: round(random(60, 90)) + "%"
    });
  }
  
  // Criar 1 caminhão
  caminhoes.push({
    x: 400,
    y: 300,
    speed: 1.5,
    indoParaCidade: true,
    carga: "Alimentos"
  });
}

function draw() {
  background(240);
  
  // Desenhar campo (lado esquerdo)
  fill(144, 238, 144);
  rect(0, 0, width/2, height);
  
  // Desenhar cidade (lado direito)
  fill(169, 169, 169);
  rect(width/2, 0, width/2, height);
  
  // Linha divisória
  stroke(0);
  line(width/2, 0, width/2, height);
  
  // Atualizar e mostrar drones
  for (let drone of drones) {
    // Movimento aleatório
    drone.angle += random(-0.1, 0.1);
    drone.x += cos(drone.angle) * drone.speed;
    drone.y += sin(drone.angle) * drone.speed;
    
    // Manter dentro do campo
    drone.x = constrain(drone.x, 20, width/2 - 20);
    drone.y = constrain(drone.y, 20, height/2);
    
    // Desenhar drone
    fill(100);
    ellipse(drone.x, drone.y, 20, 10);
    fill(150);
    rect(drone.x - 15, drone.y - 3, 30, 6);
  }
  
  // Mostrar sensores
  for (let sensor of sensores) {
    fill(0, 100, 0);
    ellipse(sensor.x, sensor.y, 15, 15);
    
    // Mostrar dados ao passar o mouse
    if (dist(mouseX, mouseY, sensor.x, sensor.y) < 10) {
      fill(255);
      rect(sensor.x - 30, sensor.y - 25, 60, 20);
      fill(0);
      textSize(12);
      text("Umidade: " + sensor.umidade, sensor.x - 28, sensor.y - 10);
    }
  }
  
  // Atualizar e mostrar caminhão
  let caminhao = caminhoes[0];
  caminhao.x += caminhao.indoParaCidade ? caminhao.speed : -caminhao.speed;
  
  // Inverter direção quando sair da tela
  if (caminhao.x > width + 30) {
    caminhao.x = width/2;
    caminhao.indoParaCidade = false;
    caminhao.carga = "Vazio";
  } else if (caminhao.x < -30) {
    caminhao.x = width/2;
    caminhao.indoParaCidade = true;
    caminhao.carga = "Alimentos";
  }
  
  // Desenhar caminhão
  fill(200, 0, 0);
  rect(caminhao.x - 30, caminhao.y - 15, 60, 30);
  fill(150);
  rect(caminhao.x - 15, caminhao.y - 25, 30, 10);
  
  // Mostrar carga ao passar o mouse
  if (dist(mouseX, mouseY, caminhao.x, caminhao.y) < 30) {
    fill(255);
    rect(caminhao.x - 40, caminhao.y - 45, 80, 20);
    fill(0);
    text("Levando: " + caminhao.carga, caminhao.x - 35, caminhao.y - 30);
  }
  
  // Linhas de conexão (dados)
  stroke(0, 0, 255, 100);
  for (let sensor of sensores) {
    line(sensor.x, sensor.y, width/2 + 50, 50);
  }
  line(width/2 + 50, 50, width - 50, 100);
  
  // Nuvem de dados
  fill(200, 200, 255);
  ellipse(width/2 + 50, 50, 60, 40);
  fill(0);
  textSize(12);
  text("Dados", width/2 + 35, 55);
  
  // Legenda simples
  fill(255, 200);
  rect(10, 10, 150, 80);
  fill(0);
  text("Tecnologias Agrícolas:", 20, 30);
  text("- Drones", 20, 50);
  text("- Sensores IoT", 20, 70);
}
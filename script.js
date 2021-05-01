let body = document.querySelector("body")
let play = document.querySelector('#play');
let volume_icon = document.querySelector('#volume_icon')
let mute_icon = document.querySelector('#mute_icon')
let volume_slider = document.querySelector('#volume_slider')
let volume_show = document.querySelector('#volume_show');
let music = document.querySelector('#music')
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let setIntervalid;
let playing_song = false
let sound_on = true
canvas.width = body.getBoundingClientRect().width - 10;
canvas.height = 400
let canvasH = canvas.getBoundingClientRect().height;
let canvasW = canvas.getBoundingClientRect().width;
let music_duration;

music.onloadedmetadata = function() {
  music_duration = this.duration
};



window.addEventListener('resize',()=>{
  canvasH = canvas.getBoundingClientRect().height
  canvasW = canvas.getBoundingClientRect().width
})

function justplay(){
  if(playing_song==false){
    playsong();

  }else{
    pausesong();
  }
}

// play track
function playsong(){
  music.play();
  setIntervalid = setInterval(draw_lines_for_progress,1000)
  playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause track
function pausesong(){
  music.pause();
  clearInterval(setIntervalid)
  playing_song = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

// manipulate sound
function toggle_sound_mute(){
  if(sound_on === false){
    sound_on = true
    mute_icon.style.display = "none"
    volume_icon.style.display = "block"
    volume_slider.style.display = "block"
    volume_show.style.display = "block"
    music.volume = volume_slider.value / 100;
  }
  else{
    sound_on = false
    mute_icon.style.display = "block"
    volume_icon.style.display = "none"
    volume_slider.style.display = "none"
    volume_show.style.display = "none"
    music.volume = 0;
  }
}

function volume_change(){
	volume_show.innerHTML = volume_slider.value;
	music.volume = volume_slider.value / 100;
}

// manipulate duration

let linearr = []

function change_music_duration(e){
  music.currentTime = (e.offsetX/canvasW)*music_duration
  if(playing_song === false){
    music.pause()
  }
  draw_lines_for_duration(e.offsetX)
}

function draw_lines(){
  for(let i=0; i<canvasW-8; i=i+8){
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = "square"
    let random_number = Math.floor(Math.random() * 51)+20;
    let random_dir = Math.random()<0.3 ? 1 : 0
    linearr.push([random_dir,random_number])
    ctx.strokeStyle = "rgb(226,226,226)"
    if(random_dir === 0){
      ctx.moveTo(i+4, 180 - random_number);
      ctx.lineTo(i+4,220)
    }
    else{
      ctx.moveTo(i+4, 180)
      ctx.lineTo(i+4, 220 + random_number);
    }
    ctx.stroke();
  }
}

draw_lines()

function draw_lines_for_duration(xval){
  let index = 0;
  for(let i = 0;i<canvasW-8;i+=8){
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = "square"
    if(i<=xval) ctx.strokeStyle = "rgb(213,159,176)"
    else ctx.strokeStyle = "rgb(226,226,226)"
    if(linearr[index][0] === 0){
      ctx.moveTo(i+4, 180 - linearr[index][1]);
      ctx.lineTo(i+4,220)
    }
    else{
      ctx.moveTo(i+4, 180)
      ctx.lineTo(i+4, 220 + linearr[index][1]);
    }
    ctx.stroke()
    index+=1;
  }
}

function draw_lines_for_progress(){
  let x = Math.floor((music.currentTime/music_duration)*canvasW)
  draw_lines_for_duration(x);
}

id = setInterval(draw_lines_for_progress,1000)

// clearInterval(id)

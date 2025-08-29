import React, { useEffect, useRef, useState } from "react";

/**
 * Chrome Dino Runner – React + Canvas port of your Pygame version
 * Features:
 *  - Run, Jump (UP/SPACE), Duck (DOWN)
 *  - Small/Large cactus + Bird with wing animation
 *  - Clouds, scrolling track background
 *  - Day/Night based on current hour
 *  - Score, High Score (localStorage), speed-up every 100 points
 *  - Pause (P) / Unpause (U)
 *  - Start / Restart menu
 *
 * Assets (same names/dirs as Python):
 *  public/assets/Dino/DinoRun1.png
 *  public/assets/Dino/DinoRun2.png
 *  public/assets/Dino/DinoJump.png
 *  public/assets/Dino/DinoDuck1.png
 *  public/assets/Dino/DinoDuck2.png
 *  public/assets/Cactus/SmallCactus1.png
 *  public/assets/Cactus/SmallCactus2.png
 *  public/assets/Cactus/SmallCactus3.png
 *  public/assets/Cactus/LargeCactus1.png
 *  public/assets/Cactus/LargeCactus2.png
 *  public/assets/Cactus/LargeCactus3.png
 *  public/assets/Bird/Bird1.png
 *  public/assets/Bird/Bird2.png
 *  public/assets/Other/Cloud.png
 *  public/assets/Other/Track.png
 *  public/assets/DinoWallpaper.png  (optional: favicon / tab icon)
 */

const SCREEN_WIDTH = 1100;
const SCREEN_HEIGHT = 600;

const X_POS = 80;
const Y_POS = 310;
const Y_POS_DUCK = 340;
const JUMP_VEL = 8.5;

const BIRD_HEIGHTS = [250, 290, 320];

const ASSETS = {
  dinoRun: ["/assets/Dino/DinoRun1.png", "/assets/Dino/DinoRun2.png"],
  dinoJump: "/assets/Dino/DinoJump.png",
  dinoDuck: ["/assets/Dino/DinoDuck1.png", "/assets/Dino/DinoDuck2.png"],
  smallCactus: [
    "/assets/Cactus/SmallCactus1.png",
    "/assets/Cactus/SmallCactus2.png",
    "/assets/Cactus/SmallCactus3.png",
  ],
  largeCactus: [
    "/assets/Cactus/LargeCactus1.png",
    "/assets/Cactus/LargeCactus2.png",
    "/assets/Cactus/LargeCactus3.png",
  ],
  bird: ["/assets/Bird/Bird1.png", "/assets/Bird/Bird2.png"],
  cloud: "/assets/Other/Cloud.png",
  track: "/assets/Other/Track.png",
  // optional: favicon
  icon: "/assets/DinoWallpaper.png",
};

export default function GamePage() {
  const canvasRef = useRef(null);

  // overlay UI states
  const [mode, setMode] = useState("menu"); // 'menu' | 'running' | 'paused' | 'dead'
  const [points, setPoints] = useState(0);
  const [high, setHigh] = useState(() => {
    const saved = localStorage.getItem("dino_highscore");
    return saved ? parseInt(saved, 10) : 0;
  });

  // keep game variables in refs so we don't trigger React re-renders
  const ctxRef = useRef(null);
  const frameRef = useRef(0);
  const rafRef = useRef(null);
  const keysRef = useRef({});

  // world refs
  const gameSpeedRef = useRef(20);
  const xPosBgRef = useRef(0);
  const yPosBgRef = useRef(380);
  const obstaclesRef = useRef([]);
  const cloudRef = useRef({ x: SCREEN_WIDTH + 800, y: 80, image: null, width: 0 });

  // player refs
  const playerRef = useRef({
    ducking: false,
    running: true,
    jumping: false,
    stepIndex: 0,
    jumpVel: JUMP_VEL,
    image: null,
    rect: { x: X_POS, y: Y_POS, w: 44, h: 47 },
  });

  // assets
  const imagesRef = useRef({
    dinoRun: [],
    dinoJump: null,
    dinoDuck: [],
    smallCactus: [],
    largeCactus: [],
    bird: [],
    cloud: null,
    track: null,
  });

  // ---------- helpers ----------
  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  const preloadAssets = async () => {
    // optional: set favicon
    if (ASSETS.icon) {
      const link =
        document.querySelector("link[rel~='icon']") || document.createElement("link");
      link.rel = "icon";
      link.href = ASSETS.icon;
      document.head.appendChild(link);
    }

    const [
      dRun1,
      dRun2,
      dJump,
      dDuck1,
      dDuck2,
      sC1,
      sC2,
      sC3,
      lC1,
      lC2,
      lC3,
      b1,
      b2,
      cloud,
      track,
    ] = await Promise.all([
      ...ASSETS.dinoRun.map(loadImage),
      loadImage(ASSETS.dinoJump),
      ...ASSETS.dinoDuck.map(loadImage),
      ...ASSETS.smallCactus.map(loadImage),
      ...ASSETS.largeCactus.map(loadImage),
      ...ASSETS.bird.map(loadImage),
      loadImage(ASSETS.cloud),
      loadImage(ASSETS.track),
    ]);

    imagesRef.current.dinoRun = [dRun1, dRun2];
    imagesRef.current.dinoJump = dJump;
    imagesRef.current.dinoDuck = [dDuck1, dDuck2];
    imagesRef.current.smallCactus = [sC1, sC2, sC3];
    imagesRef.current.largeCactus = [lC1, lC2, lC3];
    imagesRef.current.bird = [b1, b2];
    imagesRef.current.cloud = cloud;
    imagesRef.current.track = track;

    // init player image
    playerRef.current.image = imagesRef.current.dinoRun[0];

    // init cloud
    cloudRef.current.image = cloud;
    cloudRef.current.width = cloud.width;
  };

  const drawText = (ctx, text, x, y, size = 24, color = "#000", align = "left") => {
    ctx.font = `bold ${size}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
  };

  // ---------- player logic ----------
  const playerDuck = () => {
    const p = playerRef.current;
    const imgs = imagesRef.current.dinoDuck;
    p.image = imgs[Math.floor(p.stepIndex / 5) % 2];
    p.rect = { ...p.rect, x: X_POS, y: Y_POS_DUCK, w: imgs[0].width, h: imgs[0].height };
    p.stepIndex += 1;
  };

  const playerRun = () => {
    const p = playerRef.current;
    const imgs = imagesRef.current.dinoRun;
    p.image = imgs[Math.floor(p.stepIndex / 5) % 2];
    // Use fixed size similar to Python sprites so collisions feel right
    p.rect = { ...p.rect, x: X_POS, y: Y_POS, w: imgs[0].width, h: imgs[0].height };
    p.stepIndex += 1;
  };

  const playerJump = () => {
    const p = playerRef.current;
    p.image = imagesRef.current.dinoJump;
    if (p.jumping) {
      p.rect.y -= p.jumpVel * 4;
      p.jumpVel -= 0.8;
    }
    if (p.jumpVel < -JUMP_VEL) {
      p.jumping = false;
      p.jumpVel = JUMP_VEL;
    }
  };

  const updatePlayer = () => {
    const p = playerRef.current;
    const keys = keysRef.current;
    if ((keys["ArrowUp"] || keys[" "] || keys["Space"]) && !p.jumping) {
      p.ducking = false;
      p.running = false;
      p.jumping = true;
    } else if (keys["ArrowDown"] && !p.jumping) {
      p.ducking = true;
      p.running = false;
      p.jumping = false;
    } else if (!(p.jumping || keys["ArrowDown"])) {
      p.ducking = false;
      p.running = true;
      p.jumping = false;
    }

    if (p.ducking) playerDuck();
    if (p.running) playerRun();
    if (p.jumping) playerJump();
  };

  const drawPlayer = (ctx) => {
    const p = playerRef.current;
    ctx.drawImage(p.image, p.rect.x, p.rect.y);
  };

  // ---------- obstacles ----------
  const spawnObstacle = () => {
    // 0 small cactus, 1 large cactus, 2 bird
    const r = Math.floor(Math.random() * 3);
    const obsArr = obstaclesRef.current;

    if (r === 0) {
      // Small Cactus
      const type = Math.floor(Math.random() * 3); // 0..2
      const img = imagesRef.current.smallCactus[type];
      obsArr.push({
        kind: "small",
        images: imagesRef.current.smallCactus,
        type,
        rect: { x: SCREEN_WIDTH, y: 325, w: img.width, h: img.height },
        update: function () {
          this.rect.x -= gameSpeedRef.current;
        },
        draw: function (ctx) {
          ctx.drawImage(this.images[this.type], this.rect.x, this.rect.y);
        },
      });
    } else if (r === 1) {
      // Large Cactus
      const type = Math.floor(Math.random() * 3);
      const img = imagesRef.current.largeCactus[type];
      obstaclesRef.current.push({
        kind: "large",
        images: imagesRef.current.largeCactus,
        type,
        rect: { x: SCREEN_WIDTH, y: 300, w: img.width, h: img.height },
        update: function () {
          this.rect.x -= gameSpeedRef.current;
        },
        draw: function (ctx) {
          ctx.drawImage(this.images[this.type], this.rect.x, this.rect.y);
        },
      });
    } else {
      // Bird
      obstaclesRef.current.push({
        kind: "bird",
        images: imagesRef.current.bird,
        type: 0,
        idx: 0,
        rect: {
          x: SCREEN_WIDTH,
          y: BIRD_HEIGHTS[Math.floor(Math.random() * BIRD_HEIGHTS.length)],
          w: imagesRef.current.bird[0].width,
          h: imagesRef.current.bird[0].height,
        },
        update: function () {
          this.rect.x -= gameSpeedRef.current;
          this.idx = (this.idx + 1) % 10; // flap
        },
        draw: function (ctx) {
          const frame = Math.floor(this.idx / 5); // 0..1
          ctx.drawImage(this.images[frame], this.rect.x, this.rect.y);
        },
      });
    }
  };

  const updateObstacles = (ctx) => {
    const arr = obstaclesRef.current;
    for (let i = arr.length - 1; i >= 0; i--) {
      const o = arr[i];
      o.update();
      o.draw(ctx);
      if (o.rect.x < -o.rect.w) arr.splice(i, 1);
    }
  };

  const rectsCollide = (a, b) =>
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

  const checkCollision = () => {
    const p = playerRef.current.rect;
    for (const o of obstaclesRef.current) {
      if (rectsCollide(p, o.rect)) {
        return true;
      }
    }
    return false;
  };

  // ---------- clouds ----------
  const updateCloud = (ctx) => {
    const cl = cloudRef.current;
    const img = cl.image;
    cl.x -= gameSpeedRef.current * 0.5;
    if (cl.x < -cl.width) {
      cl.x = SCREEN_WIDTH + 2500 + Math.random() * 500;
      cl.y = 50 + Math.random() * 50;
    }
    ctx.drawImage(img, cl.x, cl.y);
  };

  // ---------- background track ----------
  const drawBackground = (ctx) => {
    const track = imagesRef.current.track;
    const imgW = track.width;
    const x = xPosBgRef.current;
    const y = yPosBgRef.current;
    ctx.drawImage(track, x, y);
    ctx.drawImage(track, imgW + x, y);
    if (x <= -imgW) {
      ctx.drawImage(track, imgW + x, y);
      xPosBgRef.current = 0;
    }
    xPosBgRef.current -= gameSpeedRef.current;
  };

  // ---------- score / speed ----------
  const updateScore = () => {
    setPoints((prev) => {
      const v = prev + 1;
      if (v % 100 === 0) {
        gameSpeedRef.current += 1;
      }
      return v;
    });
  };

  // ---------- day/night ----------
  const isDaytime = () => {
    const hour = new Date().getHours();
    return hour > 7 && hour < 19;
  };

  // ---------- main loop ----------
  const loop = () => {
    const ctx = ctxRef.current;
    frameRef.current++;

    // clear
    if (isDaytime()) {
      ctx.fillStyle = "#ffffff";
    } else {
      ctx.fillStyle = "#000000";
    }
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // gameplay
    updatePlayer();
    drawBackground(ctx);
    updateCloud(ctx);

    // maybe spawn obstacle
    if (obstaclesRef.current.length === 0) {
      spawnObstacle();
    }

    updateObstacles(ctx);
    drawPlayer(ctx);

    // HUD
    const color = isDaytime() ? "#000" : "#fff";
    drawText(
      ctx,
      `High Score: ${Math.max(high, points)}  Points: ${points}`,
      SCREEN_WIDTH - 40,
      40,
      20,
      color,
      "right"
    );

    // collision
    if (checkCollision()) {
      // stop game and go to menu(dead)
      cancelAnimationFrame(rafRef.current);
      setMode("dead");

      // update high score
      const newHigh = Math.max(high, points);
      setHigh(newHigh);
      localStorage.setItem("dino_highscore", String(newHigh));
      return;
    }

    // speed/score
    updateScore();

    // next frame
    rafRef.current = requestAnimationFrame(loop);
  };

  // ---------- menus ----------
  const drawMenuScreen = (ctx, deathCount) => {
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    if (isDaytime()) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    } else {
      ctx.fillStyle = "#808080";
      ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    }

    const color = isDaytime() ? "#000" : "#fff";
    const title =
      deathCount === 0 ? "Press any key to Start" : "Press any key to Restart";
    drawText(ctx, title, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 30, color, "center");

    if (deathCount > 0) {
      drawText(
        ctx,
        `Your Score: ${points}`,
        SCREEN_WIDTH / 2,
        SCREEN_HEIGHT / 2 + 50,
        30,
        color,
        "center"
      );
      drawText(
        ctx,
        `High Score: ${Math.max(high, points)}`,
        SCREEN_WIDTH / 2,
        SCREEN_HEIGHT / 2 + 100,
        30,
        color,
        "center"
      );
    }

    // little dino icon
    const run0 = imagesRef.current.dinoRun[0];
    if (run0) {
      ctx.drawImage(
        run0,
        SCREEN_WIDTH / 2 - 20,
        SCREEN_HEIGHT / 2 - 140,
        run0.width,
        run0.height
      );
    }
  };

  const startGame = () => {
    // reset world
    gameSpeedRef.current = 20;
    xPosBgRef.current = 0;
    yPosBgRef.current = 380;
    obstaclesRef.current = [];
    cloudRef.current.x = SCREEN_WIDTH + 800 + Math.random() * 200;
    cloudRef.current.y = 50 + Math.random() * 50;

    // reset player
    playerRef.current = {
      ducking: false,
      running: true,
      jumping: false,
      stepIndex: 0,
      jumpVel: JUMP_VEL,
      image: imagesRef.current.dinoRun[0],
      rect: { x: X_POS, y: Y_POS, w: 44, h: 47 },
    };

    setPoints(0);
    setMode("running");
    rafRef.current = requestAnimationFrame(loop);
  };

  const pauseGame = () => {
    if (mode !== "running") return;
    setMode("paused");
    cancelAnimationFrame(rafRef.current);
    const ctx = ctxRef.current;
    const color = isDaytime() ? "#000" : "#fff";
    drawText(
      ctx,
      "Game Paused, Press 'U' to Unpause",
      SCREEN_WIDTH / 2,
      SCREEN_HEIGHT / 3,
      30,
      color,
      "center"
    );
  };

  const unpauseGame = () => {
    if (mode !== "paused") return;
    setMode("running");
    rafRef.current = requestAnimationFrame(loop);
  };

  // ---------- effects ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    let mounted = true;

    (async () => {
      try {
        await preloadAssets();
        if (!mounted) return;
        // initial menu screen
        drawMenuScreen(ctx, 0);
      } catch (e) {
        console.error("Asset loading failed:", e);
        // fallback: show message
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        drawText(ctx, "Failed to load assets.", 40, 60, 28, "#000", "left");
      }
    })();

    // keyboard
    const down = (e) => {
      keysRef.current[e.key] = true;

      if (mode === "menu") {
        startGame();
      } else if (mode === "dead") {
        startGame();
      } else if (mode === "running") {
        if (e.key === "p" || e.key === "P") {
          pauseGame();
        }
      } else if (mode === "paused") {
        if (e.key === "u" || e.key === "U") {
          unpauseGame();
        }
      }
    };

    const up = (e) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // when mode changes to dead, draw dead menu
  useEffect(() => {
    if (mode === "dead") {
      const ctx = ctxRef.current;
      drawMenuScreen(ctx, 1);
    } else if (mode === "menu") {
      const ctx = ctxRef.current;
      drawMenuScreen(ctx, 0);
    }
  }, [mode, points, high]);

  // ---------- UI ----------
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, rgba(239,239,239,1) 72%, rgba(224,224,224,1) 100%)",
        fontFamily: "'Roboto Mono', Consolas, monospace",
      }}
    >
      <div
        style={{
          width: SCREEN_WIDTH + 16,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 1px 12px #aaa3",
          border: "1px solid #e2e2e2",
          padding: "8px 0",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px 8px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: "bold",
              color: "#6c757d",
              textShadow: "1px 1px 0 #fff",
            }}
          >
            🦖 Dino Runner
          </h2>

          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              fontWeight: 700,
              color: "#434343",
            }}
          >
            <span>
              Score: <b>{points}</b>
            </span>
            <span>
              High: <b>{high}</b>
            </span>
            <span style={{ opacity: 0.7 }}>|</span>
            <span>Jump: ⬆ / Space</span>
            <span>Duck: ⬇</span>
            <span>Pause: P</span>
            <span>Unpause: U</span>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            margin: "0 auto",
            background: "#fff",
            borderBottom: "2px solid #dedede",
            borderRadius: 10,
          }}
        />

        {mode !== "running" && (
          <div
            style={{
              position: "absolute",
              top: 72,
              left: 0,
              right: 0,
              bottom: 8,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
      `}</style>
    </div>
  );
}

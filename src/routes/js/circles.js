//import random from "https://cdn.skypack.dev/random";
//import seedrandom from "https://cdn.skypack.dev/seedrandom";

class Worklet {
  paint(ctx, geometry, props) {
    const { width, height } = geometry;

    ctx.fillStyle = "#EA2F34";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#E9EDEB";
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

if (typeof registerPaint !== "undefined") {
  registerPaint("circles", Worklet);
}
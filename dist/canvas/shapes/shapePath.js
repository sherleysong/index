function starPath(ctx) {
	var R = 20;
	ctx.beginPath();
	var r = R * Math.sin(Math.PI * 18 / 180) / Math.sin(Math.PI * 54 / 180);
	for(var i = 0; i < 5; i++) {
		ctx.lineTo(R * Math.cos(Math.PI * (-18 + 72 * i) / 180), R * Math.sin(Math.PI * (-18 + 72 * i) / 180))
		ctx.lineTo(r * Math.cos(Math.PI * (18 + 72 * i) / 180), r * Math.sin(Math.PI * (18 + 72 * i) / 180))
	}
	ctx.closePath()
}

function roundRectPath(ctx, R, w, h) {

	var R = R || 20;
	var w = w || 500;
	var h = h || 300;
	if(2 * R > Math.min(h, w)) {
		R = Math.min(w, h) / 2;
	}
	ctx.beginPath();
	ctx.moveTo(w, h - R);
	ctx.arc(w - R, h - R, R, 0, Math.PI * 0.5);
	ctx.lineTo(R, h);
	ctx.arc(R, h - R, R, Math.PI * 0.5, Math.PI * 1);
	ctx.lineTo(0, R);
	ctx.arc(R, R, R, Math.PI * 1, Math.PI * 1.5);
	ctx.lineTo(w - R, 0);
	ctx.arc(w - R, R, R, Math.PI * 1.5, Math.PI * 2)
	ctx.closePath();
}

function moonPath(ctx, R) {
	var R = R || 100;
	ctx.beginPath();
	ctx.arc(0, 0, R, Math.PI / 2, Math.PI * 1.5, true);
	ctx.moveTo(0, -R);
	//ctx.arcTo(R, 0, 0, R, Math.sqrt(2) * R);
	//ctx.quadraticCurveTo(1.1 * R, 0, 0, R);
	ctx.bezierCurveTo(0.7 * R, -0.5 * R, 0.7 * R, 0.5 * R, 0, R);
	ctx.closePath()
}
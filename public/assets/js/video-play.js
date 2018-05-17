application = new ZiggeoApi.V2.Application({
  token: "4919f23cbee42b4be71fdc75207c9e30",
});

$(function() {
  token = $(".vid-title").attr("value");

  var video = $(
    "<ziggeo id=video_player ziggeo-width=560 ziggeo-height=315 ziggeo-playonclick=true ziggeo-video=" +
      token +
      "></ziggeo>"
  );

  application.on("ready", function() {
    $(".vid-card").append(video);
  });
});

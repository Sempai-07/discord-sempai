const memberVoice = (msg) => {
  var voice;
  try {
    voice = msg.member.voice;
  } catch (e) {
    voice = undefined;
  }
  return voice;
};

module.exports = memberVoice;
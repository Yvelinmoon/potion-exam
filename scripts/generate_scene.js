#!/usr/bin/env node
/**
 * 魔药课考试场景图生成脚本
 * 根据考试成绩生成斯内普教授点评角色的图片prompt
 */

const houses = {
  gryffindor: {
    colors: 'deep red and gold',
    elements: 'lion crest, golden trophies, warm torchlight'
  },
  slytherin: {
    colors: 'emerald green and silver',
    elements: 'serpent motifs, silver vials, mysterious atmosphere'
  },
  ravenclaw: {
    colors: 'blue and bronze',
    elements: 'eagle statues, ancient books, intellectual mood'
  },
  hufflepuff: {
    colors: 'yellow and black',
    elements: 'badger emblem, warm candlelight, welcoming feel'
  }
};

function generatePrompt(agentName, result) {
  const grade = result.grade.grade;
  const score = result.score;
  
  // 根据成绩调整场景氛围
  let mood = '';
  let snapePose = '';
  
  if (grade === 'O') {
    mood = 'approving but still stern, subtle nod of approval';
    snapePose = 'standing with arms folded, giving a rare slight nod';
  } else if (grade === 'E') {
    mood = 'slightly impressed but trying to hide it';
    snapePose = 'looking at you with narrowed eyes, one eyebrow raised';
  } else if (grade === 'A') {
    mood = 'dismissive, as if saying "barely acceptable"';
    snapePose = 'turning away with a snort';
  } else if (grade === 'P') {
    mood = 'disappointed and angry';
    snapePose = 'pointing at your failed potion with disgust';
  } else if (grade === 'D') {
    mood = 'scathing, extremely disappointed';
    snapePose = 'slamming his hand on the desk, glaring';
  } else {
    mood = 'outraged, looking utterly disgusted';
    snapePose = 'throwing your potion across the room in disgust';
  }
  
  const prompt = `${agentName} receiving evaluation from Professor Snape in the Dungeon classroom, ` +
    `Snape is ${snapePose}, ${mood}, ` +
    `dark dungeon setting with stone walls, flickering candlelight, ` +
    `potion bottles and cauldrons on wooden shelves, ` +
    `Steam-style lighting, dramatic shadows, Harry Potter universe aesthetic`;
  
  const promptCN = `${agentName}在地下教室里接受斯内普教授的点评，` +
    `斯内普教授${snapePose}，表情${mood}，` +
    `昏暗的地下教室环境，石墙上的蜡烛摇曳，` +
    `木架上摆满药剂瓶和坩埚，电影级光影，哈利波特奇幻风格`;
  
  return { prompt, promptCN };
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('用法: node generate_scene.js "<student_name>" \'<result_json>\'');
    console.log('示例: node generate_scene.js "Harry" \'{"grade":{"grade":"O","name":"优秀"}}\'');
    process.exit(1);
  }
  
  const studentName = args[0];
  let result;
  try {
    result = JSON.parse(args[1]);
  } catch (e) {
    console.error('错误: 无法解析JSON结果');
    process.exit(1);
  }
  
  const { prompt, promptCN } = generatePrompt(studentName, result);
  
  const output = {
    student: studentName,
    grade: result.grade,
    score: result.score,
    comment: result.comment,
    prompt: prompt,
    prompt_cn: promptCN
  };
  
  console.log(JSON.stringify(output, null, 2));
}

if (require.main === module) {
  main();
}

module.exports = { generatePrompt, houses };

#!/usr/bin/env node
/**
 * 魔药课考试场景图生成脚本
 * 根据考试成绩生成斯内普教授点评角色的图片prompt
 */

const gradeData = {
  O: {
    mood: 'approving but still stern, subtle nod of approval',
    pose: 'standing with arms folded, giving a rare slight nod',
    bubble: 'Not bad... for a Potter.',
    background: 'dark dungeon with gleaming potion bottles'
  },
  E: {
    mood: 'slightly impressed but trying to hide it',
    pose: 'looking at the student with narrowed eyes, one eyebrow raised',
    bubble: 'Acceptable. Do not let it go to your head.',
    background: 'dungeon classroom with cauldrons steaming'
  },
  A: {
    mood: 'dismissive, as if saying "barely acceptable"',
    pose: 'turning away with a snort',
    bubble: 'Barely passing. I expected nothing more.',
    background: 'dimly lit dungeon with dusty shelves'
  },
  P: {
    mood: 'disappointed and angry',
    pose: 'pointing at the failed potion with disgust',
    bubble: 'This is pitiful. Utterly pitiful.',
    background: 'messy dungeon with spilled potions'
  },
  D: {
    mood: 'scathing, extremely disappointed',
    pose: 'slamming his hand on the desk, glaring',
    bubble: 'A disgrace to this classroom!',
    background: 'shadowy dungeon with broken glassware'
  },
  T: {
    mood: 'outraged, looking utterly disgusted',
    pose: 'throwing the potion across the room in disgust',
    bubble: 'Troll! Clear out of my sight!',
    background: 'chaotic dungeon with smoke and shattered vials'
  }
};

function generatePrompt(agentName, result) {
  const grade = result.grade.grade;
  const data = gradeData[grade] || gradeData.T;
  
  const prompt = `${agentName} receiving evaluation from Professor Snape in the Dungeon classroom, ` +
    `Snape is ${data.pose}, ${data.mood}, ` +
    `speech bubble from Snape showing "${data.bubble}", ` +
    `${agentName} reacting nervously to the critique, ` +
    `dark dungeon setting with stone walls, flickering candlelight, ` +
    `potion bottles and cauldrons on wooden shelves, ${data.background}, ` +
    `Steam-style lighting, dramatic shadows, Harry Potter universe aesthetic`;
  
  const promptCN = `${agentName}在地下教室里接受斯内普教授的点评，` +
    `斯内普教授${data.pose}，表情${data.mood}，` +
    `斯内普头顶的对话气泡写着"${data.bubble}"，` +
    `${agentName}紧张地接受批评，` +
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

module.exports = { generatePrompt, gradeData };

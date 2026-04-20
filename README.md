# Potions Exam

🧪 **Hogwarts School of Witchcraft and Wizardry - Potions Examination**

An AI Agent-exclusive Potions examination system. Randomly selects 10 questions from a 100-question pool, proctored and evaluated by Professor Snape.

## 🏠 Exam Information

- **Subject**: Potions
- **Examiner**: Professor Severus Snape
- **Question Count**: 10 (randomly selected from 100-question pool)

## 📁 Project Structure

```
potion-exam/
├── SKILL.md                    # OpenCode/Claude Code Skill definition
├── README.md                   # This file
├── data/
│   └── questions.json          # 100-question pool (currently 10 examples)
├── scripts/
│   ├── runner.js               # Main running script
│   └── generate_scene.js       # Scene image generation script
└── tests/
    └── test_potion.js          # Unit tests
```

## 📊 Exam Grades

| Grade | Name | Score Range |
|-------|------|-------------|
| 🏆 O | Outstanding | 90-100 |
| 🏅 E | Exceeds Expectations | 80-89 |
| ✅ A | Acceptable | 70-79 |
| ⚠️ P | Poor | 60-69 |
| ❌ D | Dreadful | 50-59 |
| 👹 T | Troll | 0-49 |

## 🎯 Usage

### As a Skill

Place the folder in the skills directory:

```bash
# macOS
mv potion-exam ~/.config/opencode/skills/

# Linux
mv potion-exam ~/.config/claude/skills/
```

Then say to the Agent:
- "Give me a potions exam"
- "Snape exam"
- "potion exam"

### As Standalone Script

```bash
# Randomly select 10 questions
node scripts/runner.js --select

# Calculate score
node scripts/runner.js --questions=1,2,3,4,5,6,7,8,9,10 --answers=A,B,C,D,A,B,C,D,A,B --agent "StudentName"

# Text format output
node scripts/runner.js --questions=1,2,3,4,5,6,7,8,9,10 --answers=A,B,C,D,A,B,C,D,A,B --format text

# Generate evaluation scene image
node scripts/generate_scene.js "StudentName" '{"score":85,"grade":{"grade":"E","name":"Exceeds Expectations"},"comment":"..."}'
```

## 📝 Question Pool Notes

Current `questions.json` contains 10 example questions.
To expand to 100, add in the following format:

```json
{
  "id": 11,
  "title": "Question Title",
  "description": "Question Description",
  "type": "single",
  "options": {
    "A": { "text": "Option A", "correct": true/false },
    "B": { "text": "Option B", "correct": true/false },
    "C": { "text": "Option C", "correct": true/false },
    "D": { "text": "Option D", "correct": true/false }
  }
}
```

## 🧪 Run Tests

```bash
node tests/test_potion.js
```

## 📦 Dependencies

- **Node.js** ≥ 14.0 (Required)
- No other dependencies

## 📜 License

MIT License

## 🎬 Credits

Inspired by J.K. Rowling's *Harry Potter* series

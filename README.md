# eslint-plugin-enhancer

Welcome to `eslint-plugin-enhancer`! This custom ESLint plugin is here to help you write cleaner, more maintainable code. 🌟 It includes rules to organize your files, keep your classes tidy, and make your regular expressions easy to understand. Let’s level up your linting game! 🎉

## 🔧 Installation

Getting started is easy! Just add this plugin to your project:

```bash
npm install eslint-plugin-enhancer --save-dev
```

## 📜 Rules

### 🗂️ `enhancer/enforce-one-class-per-file`

Keep it simple: one file, one class. This makes your code easier to navigate and maintain. 💼

- **Recommended Severity**: `error`

#### Example
**❌ Invalid:**
```javascript
class A {}
class B {}
```

**✅ Valid:**
```javascript
class A {}
// Other classes go in separate files!
```

---

### 📏 `enhancer/enforce-max-lines-per-class`

Let’s keep those classes concise and readable! This rule sets a maximum number of lines per class. ✂️

- **Recommended Severity**: `error`
- **Options**:
  - `max` (number): Maximum number of lines allowed in a class.

#### Example Configuration
```javascript
"enhancer/enforce-max-lines-per-class": ["error", { "max": 55 }]
```

**❌ Invalid:**
```javascript
class A {
  // Too many lines!
}
```

**✅ Valid:**
```javascript
class A {
  // Neatly within the limit.
}
```

---

### 🔍 `enhancer/require-regexp-explanation`

Regular expressions can be tricky. This rule makes sure every regex comes with a helpful comment or explanation. 🧙‍♂️✨

- **Recommended Severity**: `warn`

#### Example
**❌ Invalid:**
```javascript
const regex = /[a-z]{2}/;
```

**✅ Valid:**
```javascript
// Matches two lowercase letters.
const regex = /[a-z]{2}/;
```

## 🎯 Usage

Add the plugin to your ESLint configuration and start enhancing your code! 🚀

```javascript
module.exports = {
  plugins: ["enhancer"],
  rules: {
    "enhancer/enforce-one-class-per-file": "error",
    "enhancer/enforce-max-lines-per-class": ["error", { "max": 55 }],
    "enhancer/require-regexp-explanation": "warn",
  },
};
```

## 📜 License

This plugin is licensed under the MIT License. Feel free to contribute or share! 💖
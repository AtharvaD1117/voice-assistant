# 👩‍🍳 Voice-Controlled Cooking Assistant

A mobile application that helps users cook hands-free using voice commands. Built with **React Native (Expo)** and powered by **OpenAI Whisper API** and **Firebase**.

---

## 🚀 Features

- 🎤 Start, proceed, or repeat recipe steps using voice
- 🧠 Uses OpenAI Whisper API for speech-to-text
- 🔊 Reads ingredients and steps aloud using Web Speech API
- ☁️ Recipes are fetched from Firebase Firestore
- 🌐 Backend built with Node.js and Express

---

## 🛠 Tech Stack

| Frontend       | Backend        | API Services        | State Management |
|----------------|----------------|---------------------|------------------|
| React Native (Expo) | Node.js + Express | Web Speech API, OpenAI Whisper | Redux Toolkit |

---

## 🧪 Voice Commands Supported

- `"start"` — restart the recipe from step 1
- `"next"` — move to the next step
- `"ingredients"` — read out the list of ingredients

---

## 🧰 Setup Instructions

### 📦 1. Clone the repo and install dependencies

```bash
git clone https://github.com/yourusername/voice-assistant.git
cd voice-assistant

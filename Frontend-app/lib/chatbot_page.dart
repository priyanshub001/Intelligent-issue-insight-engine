import 'package:flutter/material.dart';
import 'main.dart';

class ChatbotPage extends StatefulWidget {
  @override
  State<ChatbotPage> createState() => _ChatbotPageState();
}

class _ChatbotPageState extends State<ChatbotPage> {
  TextEditingController controller = TextEditingController();
  List<Map<String, String>> chats = [];

  void send() {
    if (controller.text.isEmpty) return;

    String msg = controller.text.toLowerCase();
    String type = "General Issue";
    int priority = 3;

    if (msg.contains("crash") || msg.contains("not working")) {
      type = "Critical Issue";
      priority = 1;
    } else if (msg.contains("slow") || msg.contains("delay")) {
      type = "Performance Issue";
      priority = 2;
    }

    issueList.add(Issue(controller.text, type, priority));

    setState(() {
      chats.add({"user": controller.text});
      chats.add({"bot": "Issue detected: $type"});
      controller.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text("Smart Chatbot"),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: chats.length,
              itemBuilder: (_, i) {
                bool isUser = chats[i].containsKey("user");
                return Align(
                  alignment:
                  isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.all(8),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isUser
                          ? const Color(0xFF38BDF8)
                          : const Color(0xFF1E293B),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      isUser ? chats[i]["user"]! : chats[i]["bot"]!,
                      style: TextStyle(
                        color: isUser ? Colors.black : Colors.white,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.all(10),
            color: const Color(0xFF1E293B),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: controller,
                    style: const TextStyle(color: Colors.white),
                    decoration: const InputDecoration(
                      hintText: "Describe your issue...",
                      hintStyle: TextStyle(color: Colors.grey),
                      border: InputBorder.none,
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send, color: Color(0xFF38BDF8)),
                  onPressed: send,
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}

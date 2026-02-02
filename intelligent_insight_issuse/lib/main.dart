import 'package:flutter/material.dart';
import 'chatbot_page.dart';
import 'admin_panel.dart';

void main() {
  runApp(const MyApp());
}

// Shared Issue Model
class Issue {
  String text;
  String type;
  int priority;
  Issue(this.text, this.type, this.priority);
}

// Shared List
List<Issue> issueList = [];

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text("Intelligent Insight Issues"),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _btn(context, "User Chatbot", Icons.chat, ChatbotPage()),
            const SizedBox(height: 20),
            _btn(context, "Admin Panel", Icons.admin_panel_settings, AdminPanel()),
          ],
        ),
      ),
    );
  }

  Widget _btn(BuildContext ctx, String text, IconData icon, Widget page) {
    return ElevatedButton.icon(
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF38BDF8),
        padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
      ),
      icon: Icon(icon, color: Colors.black),
      label: Text(text, style: const TextStyle(color: Colors.black)),
      onPressed: () {
        Navigator.push(ctx, MaterialPageRoute(builder: (_) => page));
      },
    );
  }
}

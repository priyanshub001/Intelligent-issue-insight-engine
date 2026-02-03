import 'package:flutter/material.dart';
import 'issue_form.dart';
import 'dashboard_page.dart';

void main() {
  runApp(const IssueInsightApp());
}

class IssueInsightApp extends StatelessWidget {
  const IssueInsightApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Issue Insight Engine',
      theme: ThemeData(
        useMaterial3: true,
        fontFamily: 'Roboto',
      ),
      home: const IssueFormPage(),
      routes: {
        '/dashboard': (context) => const DashboardPage(),
      },
    );
  }
}

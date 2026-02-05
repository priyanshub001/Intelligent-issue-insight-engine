import 'package:flutter/material.dart';
import 'package:intelligent_insight_issuse/LoginPage.dart';
import 'package:intelligent_insight_issuse/RegisterPage.dart';
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
      home: LoginScreen(),
      routes: {
        '/dashboard': (context) => const DashboardPage(),
      },
    );
  }
}

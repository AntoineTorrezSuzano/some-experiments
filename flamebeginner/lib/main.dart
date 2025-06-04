import 'package:flame/game.dart';
import 'package:flamebeginner/touhou.dart';
import 'package:flutter/material.dart';

void main() {
  final game = Touhou();
  runApp(GameWidget(game: game));
}

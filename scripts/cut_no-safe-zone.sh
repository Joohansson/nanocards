#!/bin/bash
convert nanocard_sheet_1.png -fuzz 1% -trim +repage -crop 1232x1920 +gravity +repage -gravity center -crop 1122x1742+0+0 +repage -scene 1 card_1_%02d.png
convert nanocard_sheet_2.png -fuzz 1% -trim +repage -crop 1232x1920 +gravity +repage -gravity center -crop 1122x1742+0+0 +repage -scene 1 card_2_%02d.png
convert nanocard_sheet_3.png -fuzz 1% -trim +repage -crop 1232x1920 +gravity +repage -gravity center -crop 1122x1742+0+0 +repage -scene 1 card_3_%02d.png
convert nanocard_sheet_4.png -fuzz 1% -trim +repage -crop 1232x1920 +gravity +repage -gravity center -crop 1122x1742+0+0 +repage -scene 1 card_4_%02d.png
convert nanocard_sheet_5.png -fuzz 1% -trim +repage -crop 1232x1920 +gravity +repage -gravity center -crop 1122x1742+0+0 +repage -scene 1 card_5_%02d.png
convert nanocard_sheet_6.png -fuzz 1% -trim +repage -crop 1232x1920 +gravity +repage -gravity center -crop 1122x1742+0+0 +repage -scene 1 card_6_%02d.png
convert nanocard_sheet_7.png -fuzz 1% -trim +repage -crop 1232x1920 +gravity +repage -gravity center -crop 1122x1742+0+0 +repage -scene 1 card_7_%02d.png
convert nanocard_sheet_Back.png -fuzz 1% -trim +repage -gravity center -crop 4928x3840+0+0 +repage -gravity northwest -crop 1232x1920+0+0 +repage -gravity center -crop 1122x1742+0+0 +repage card_back.png
convert card_1_01.png -fill white -draw "rectangle 278,783 845,1351" card_1_01_safe.png
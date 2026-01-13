Extremely minimal spoilboard surfacing toolpath generator for GRBL-based machines. The operation only contains spindle commands and XY moves. No Z moves. 

The operation starts from the current position. You must manually move to the correct starting position before beginning the program. If unsure, please use an actual CAM program instead of this. While surfacing is pretty simple, this program is extremely basic and does not include many protections against machine crashes.

[View the app on GitHub pages](https://dtgreene.github.io/grbl-surfacing/dist/)

<img width="1369" height="952" alt="2026-01-13 17_24_44-GRBL Surfacing — Mozilla Firefox" src="https://github.com/user-attachments/assets/0f43b010-e1bc-4f7b-bc44-c7d7160645be" />


There is a simple previewer included as well. The output can be plugged into https://ncviewer.com/ to preview further.

<img width="1920" height="953" alt="2026-01-13 17_29_38-surfacing nc - NCViewer — Mozilla Firefox" src="https://github.com/user-attachments/assets/2d83cfc0-2ea8-4fc5-917a-b66658d9ea71" />

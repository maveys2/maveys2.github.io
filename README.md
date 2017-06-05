# llsif-visual-novel
Working project to create a visual novel based on Love Live School Idol Project 


Built on JavaScript. Just download and run in browser or go to website (not currently running).

To make your own scenes, use the object created in ch1.js called Frame()

Frame() has many variables. First create an instance of the object, var frame1 = new Frame();

Edit the values of frame1 such as frame1.bg = "./assets/backgrounds/bg (102).png"

## Frame() member variables
  **is_choice:** boolean, represents if this frame should be a choice for the user (true) or just a normal reading scene (false)
  
  **bg:** String, url of an image to load as the background, no need to reload background on multiple frames, leave empty
  
  **left_idol:** String, url of the character to load as the left position
  
  **middle_idol:** String, url of the character to load as the middle position
  
  **right_idol:** String, url of the character to load as the right position
  
  **text_one:** String, the text the character is saying, text will be displayed on line one, MAX 60 char
  
  **text_two:** String, the text the character is saying, text will be displayed on line two, MAX 60 char
  
  **text_three:** String, the text the character is saying, text will be displayed on line three, MAX 60 char
  
  **speaker_name:** String, the name of the speaker
  
  **speaker_pos:** String, value MUST BE EITHER "left", "middle", or "right" case sensitive. This identifies which character is speaking
  
 After editing the frame, add it to an array, i.e chapter_one.push(frame1)
 
 This creates frames and will ready each chapter frame by frame.

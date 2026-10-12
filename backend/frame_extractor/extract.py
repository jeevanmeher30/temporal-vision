import cv2
import os

video = cv2.VideoCapture("../../videos/video.mp4")

output_folder = "../../frontend/public/frames"

os.makedirs(output_folder,exist_ok = True)

frame_skip = 5
frame_count = 0
saved_count = 0

while True:
    ret,frame = video.read()
    # print(frame.shape)

    if not ret:
        break

    if frame_count % frame_skip == 0:

        frame = cv2.resize(
            frame, 
            (540, int(frame.shape[0] * 540 / frame.shape[1]))
        )
        filename = f"{output_folder}/frame_{saved_count:04d}.jpg"
        cv2.imwrite(filename,frame)
        saved_count += 1

    frame_count +=1

print("Org frames: ", frame_count)
print("Saved frames:" , saved_count)


video.release()

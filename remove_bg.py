from rembg import remove
from PIL import Image

input_path = "public/hero-image.jpg"
output_path = "public/hero-subject.png"

try:
    print(f"Opening {input_path}...")
    input_image = Image.open(input_path)
    
    print("Removing background (this may take a moment while downloading models if first time)...")
    output_image = remove(input_image)
    
    print(f"Saving to {output_path}...")
    output_image.save(output_path, "PNG")
    print("Done!")
except Exception as e:
    print(f"An error occurred: {e}")

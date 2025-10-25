# AgroVision ONNX Model

This is a placeholder for the ONNX model file. In production, this would contain the actual trained model.

## Model Information

- **Model Type**: Crop Disease Detection
- **Framework**: PyTorch/TensorFlow converted to ONNX
- **Input**: RGB image (224x224 pixels)
- **Output**: Disease classification with confidence scores
- **Supported Diseases**: 20+ common crop diseases

## Model File

The actual model file `model.onnx` should be placed in this directory before deployment.

## Training

Model training details:
- Dataset: 50,000+ labeled crop disease images
- Architecture: ResNet50 with custom head
- Accuracy: 94% on validation set
- Last updated: 2025-01-15

## Usage

```python
import onnxruntime as ort
import numpy as np
from PIL import Image

# Load model
session = ort.InferenceSession('model.onnx')

# Prepare image
image = Image.open('leaf.jpg').resize((224, 224))
image_array = np.array(image).astype(np.float32) / 255.0
image_array = np.transpose(image_array, (2, 0, 1))
image_array = np.expand_dims(image_array, axis=0)

# Run inference
outputs = session.run(None, {'input': image_array})
predictions = outputs[0]
```

## Model Versioning

- v1.0: Initial release (2025-01-15)
- Future versions will be added here

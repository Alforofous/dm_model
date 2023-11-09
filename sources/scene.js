import * as THREE from 'three';

class Scene extends THREE.Scene
{
	constructor()
	{
		super();

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
		directionalLight.position.set(0, 1, 2);
		directionalLight.castShadow = true;
		this.add(directionalLight);

		const pointLight = new THREE.PointLight(0xffffff, 5000.0);
		pointLight.position.set(100, 600, 0);
		pointLight.castShadow = true;
		this.add(pointLight);

		const pointLightHelper = new THREE.PointLightHelper(pointLight, 5, pointLight.color);
		pointLight.add(pointLightHelper);
		this.add(pointLightHelper);

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
		this.add(ambientLight);

		this.opacitySlider = document.getElementById('opacitySlider');
		this.opacitySlider.addEventListener('input', this.changeOpacity.bind(this));
	}

	changeOpacity()
	{
		let value = parseFloat(this.opacitySlider.value) / 100;
		for (let i = 0; i < this.children.length; i++)
		{
			let object = this.children[i];
			if (object instanceof THREE.Group)
			{
				object.traverse((child) =>
				{
					if (child.material)
					{
						this.setOpacity(child, value);
					}
				});
			} else if (object.material)
			{
				this.setOpacity(object, value);
			}
		}
	}

	setOpacity(object, value)
	{
		if (Array.isArray(object.material))
		{
			for (let i = 0; i < object.material.length; i++)
			{
				object.material[i].opacity = value;
				object.material[i].transparent = value < 1;
				object.material[i].depthTest = value < 1;
			}
		} else
		{
			object.material.opacity = value;
			object.material.transparent = value < 1;
			object.material.depthTest = value < 1;
		}
	}

	opacitySlider;
	currentDynamicMesh;
}

export { Scene };
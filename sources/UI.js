import * as THREE from 'three';

class UI
{
	constructor(scene)
	{
		this.buttons = document.querySelectorAll('.sidebar-button');

		this.buttons.forEach(button =>
		{
			button.addEventListener('click', function (event)
			{
				this.buttons.forEach(btn => btn.classList.remove('active'));
				if (this.active_button === event.target)
				{
					event.target.classList.remove('active');
					this.active_button = undefined;
					return;
				}
				else
				{
					event.target.classList.add('active');
					this.active_button = event.target;
				}
			}.bind(this));
		});

		this.wireframeButton = document.getElementById('wireframeButton');
		this.wireframeButton.addEventListener('click', function ()
		{
			for (let i = 0; i < scene.children.length; i++)
			{
				let object = scene.children[i];
				if (object instanceof THREE.Group)
				{
					object.traverse(function (child)
					{
						if (child.material)
						{
							toggleWireframe(child);
						}
					});
				}
				else if (object.material)
				{
					toggleWireframe(object);
				}
			}
		});

		function toggleWireframe(object)
		{
			if (Array.isArray(object.material))
			{
				for (let i = 0; i < object.material.length; i++)
				{
					object.material[i].wireframe = !object.material[i].wireframe;
				}
			}
			else
			{
				object.material.wireframe = !object.material.wireframe;
			}
		}
	}

	updateInfo(camera, deltaTime, scene)
	{
		const camera_position = document.getElementById('camera_position');
		camera_position.textContent = 'Camera Position: x: ' + camera.position.x.toFixed(2) + ', y: ' + camera.position.y.toFixed(2) + ', z: ' + camera.position.z.toFixed(2);

		const camera_rotation = document.getElementById('camera_rotation');
		camera_rotation.textContent = 'Camera rotation: x: ' + camera.rotation.x.toFixed(2) + ', y: ' + camera.rotation.y.toFixed(2) + ', z: ' + camera.rotation.z.toFixed(2);

		const object_count = document.getElementById('object_count');
		let triangleCount = 0;
		scene.traverse((child) =>
		{
			if (child.isMesh)
			{
				let count = child.geometry.index ? child.geometry.index.count / 3 : child.geometry.attributes.position.count / 3;
				if (child instanceof THREE.InstancedMesh)
				{
					count *= child.count;
				}
				triangleCount += count;
			}
		});
		object_count.textContent = 'Object count: ' + scene.children.length + ', Triangle count: ' + triangleCount;
	}

	buttons;
	active_button;
	wireframeButton;
}

export { UI };
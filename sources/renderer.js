import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import { EffectComposer, EffectPass, RenderPass, OutlineEffect } from "postprocessing";

class Renderer extends WebGLRenderer
{
	constructor(scene, camera, drillHoleCamera)
	{
		super();
		this.scene = scene;
		this.camera = camera;
		this.domElement.style.position = 'relative';
		this.domElement.style.width = '75%';
		this.domElement.style.height = '100vh';
		this.domElement.style.left = `25%`;

		this.outlineEffectSetup();

		this.composer = new EffectComposer(this);
		this.composer.addPass(new RenderPass(scene, camera), 0);
		this.composer.addPass(new RenderPass(scene, drillHoleCamera), 1);
		this.composer.addPass(new EffectPass(camera, this.outlineEffect), 2);

		document.body.appendChild(this.domElement);
		this.setSize(this.domElement.clientWidth, this.domElement.clientHeight);
		this.composer.setSize(this.domElement.clientWidth, this.domElement.clientHeight);

		this.info.autoReset = false;
	}

	outlineEffectSetup()
	{
		this.outlineEffect = new OutlineEffect(
			this.scene,
			this.camera,
			{
				xRay: true,
				pulseSpeed: 0.5,
				visibleEdgeColor: 0x379CA5,
				hiddenEdgeColor: 0xFFFFFF,
				edgeStrength: 3.0,
				blur: false,
			}
		);
	}
}

export { Renderer };
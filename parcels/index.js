import * as THREE from 'three';
import {GLTFLoader} from 'GLTFLoader';
import {renderer, camera, runtime, world, universe, physics, ui, rig, app, scene, appManager, popovers, crypto, constants} from 'app';

const gltfLoader = new GLTFLoader();

const {tokensHost, landHost} = constants;

(async () => {
  let parcelsJson = await universe.getParcels();
  // parcelsJson = parcelsJson.slice(0, 1);
  for (const parcel of parcelsJson) {
    (async () => {
      const landUrl = `${landHost}/${parcel.id}`;
      const res = await fetch(landUrl);
      const land = await res.json();
      const {hash: contentId} = land.properties;
      
      const id = (() => {
        const id = parseInt(contentId, 10);
        if (id > 0) {
          return id;
        } else {
          let u;
          try {
            u = new URL(contentId);
          } catch (err) {
            u = null;
          }
          if (u && /\.[^\.]+$/.test(u.pathname)) {
            return contentId;
          } else {
            return null;
          }
        }
      })();
      const u = await (async () => {
        if (typeof id === 'number') {
          const res = await fetch(`https://tokens.webaverse.com/${id}`);
          const j = await res.json();
          const {properties: {ext, hash, name}} = j;
          // console.warn(j);
          return `https://ipfs.exokit.org/${hash}/${name}.${ext}`;
        } else if (typeof id === 'string') {
          return id;
        } else {
          return null;
        }
      })();
      // console.log('loading', parcel, id, u);
      
      const {name} = parcel;
      const {rarity} = parcel.properties;
      const extents = JSON.parse(parcel.properties.extents);
      const box = new THREE.Box3(
        new THREE.Vector3().fromArray(extents[0]),
        new THREE.Vector3().fromArray(extents[1])
      );
      const center = box.getCenter(new THREE.Vector3());
      const centerBox = new THREE.Box3(
        box.min.clone().sub(center),
        box.max.clone().sub(center)
      );
      
      const popoverWidth = 600;
      const popoverHeight = 200;
      const popoverTextMesh = (() => {
        const textMesh = ui.makeTextMesh(name + '\n[E] to enter', undefined, 0.5, 'center', 'middle');
        textMesh.position.z = 0.1;
        textMesh.scale.x = popoverHeight / popoverWidth;
        textMesh.color = 0xFFFFFF;
        return textMesh;
      })();
      const popoverTarget = new THREE.Object3D();
      popoverTarget.position.copy(center)
        .add(new THREE.Vector3(0, 0.5, 0));
      const popoverMesh = popovers.addPopover(popoverTextMesh, {
        width: popoverWidth,
        height: popoverHeight,
        target: popoverTarget,
      });

      const o = {
        contentId: id || `https://webaverse.github.io/parcels/parcel.scn`,
        room: name.replace(/ /g, '-'),
        rarity,
        extents,
      };
      const s = JSON.stringify(o);
      const b = new Blob([s], {
        type: 'application/json',
      });
      const parcelUrl = URL.createObjectURL(b) + '/parcel.url';
      // const bakeUrl = u && `https://bake.exokit.org/model.glb?u=${u}&e=${JSON.stringify([centerBox.min.toArray(), centerBox.max.toArray()])}`;

      await Promise.all([
        world.addStaticObject(parcelUrl, null, new THREE.Vector3(), new THREE.Quaternion()),
        // bakeUrl ? world.addStaticObject(bakeUrl, null, new THREE.Vector3(center.x, box.min.y, center.z), new THREE.Quaternion()) : Promise.resolve(),
      ]);
    })();
  }
})();
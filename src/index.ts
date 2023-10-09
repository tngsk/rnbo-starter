/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference types="@rnbo/js" />

// import { createDevice, Device, IPatcher, MessageEvent } from "@rnbo/js";
const { createDevice, Device, IPatcher, MessageEvent } = RNBO;

// rnbo.js
let patcher: IPatcher;
let context: AudioContext;
let device: Device

const setup = async () => {

    context = new AudioContext();
    await context.resume();

    const rawPatcher = await fetch("export/rnbo-starter.export.json");
    const patcher = await rawPatcher.json();

    device = await createDevice({
        patcher: patcher,
        context: context
    });

    device.node.connect(context.destination);

    // export時に生成されたdependenciesのmapのようなファイルを取得する
    // const dependencies = await (await fetch("dependencies.json")).json();
    // await device.loadDataBufferDependencies(dependencies); // bufferをロードする

    //
    // const audioBuf = await context.decodeAudioData(arrayBuf);
    // await device.setDataBuffer("buf_sample", audioBuf);

    // Parameters
    device.parameters.forEach(parameter => {
        // Uncomment this line to include only top level parameters.
        // if (parameter.id.includes("/")) return;
        console.log(parameter.id);
        // console.log(parameter.name);
    });

    //


}

//
// UI & Logic
document.getElementById('audio_start')?.addEventListener('click', setup)

document.getElementById('freq')?.addEventListener('click', (e) => {
    device.parametersById.get("freq").value = e.currentTarget.value
})

document.getElementById('parameters')?.addEventListener('click', () => {
    // Parameters
    device.parameters.forEach(parameter => {
        // Uncomment this line to include only top level parameters.
        // if (parameter.id.includes("/")) return;
        console.log(parameter.id);
        // console.log(parameter.name);
    });

})

import { useEffect, useState } from "react"
import * as Tone from "tone"

const NOTES = ["C4", "E4", "G3", "D3", "E4", "F4", "D2", "A2", "G2", "D5", "A6", "F5", null, null, null, null]
const DURATIONS = ["4n", "8n", "8n", "2n"]

const WAVEFORMS = ["sine", "square", "triangle"] as const

function randomWaveform() {
    return WAVEFORMS[Math.floor(Math.random() * WAVEFORMS.length)]
}

function randomSequence(steps: number) {
  let time = 0
  return Array.from({ length: steps }, () => {

    const note = NOTES[Math.floor(Math.random() * NOTES.length)]
    const duration = DURATIONS[Math.floor(Math.random() * DURATIONS.length)]
    const event = { time: `0:${time}`, note, duration }
    time += 0.5
    return event

  })
}


export function BackgroundMusic() {
  const [started, setStarted] = useState(false)
  let currentPart: Tone.Part | null = null

  async function handleStart() {
    await Tone.start()

    const sequenceLength = "1m"

    const synth = new Tone.PolySynth(Tone.Synth, {
      envelope: {
        attack: 0.3,
        decay: 0.5
      }

    })
    const lfo2 = new Tone.LFO({
      frequency: "2m",
      min: -36,
      max: -24
    }).start()

    lfo2.connect(synth.volume)

    const reverb = new Tone.Reverb({
      decay: 5,
      predelay: 0.01,
      wet: 0.5
    }).toDestination()

    const chorus = new Tone.Chorus()
    const delay = new Tone.FeedbackDelay()
    const filter = new Tone.Filter({
      type: "lowpass",
      frequency: 1200,
      rolloff: -12,
      Q: 1
    })
    const lfo = new Tone.LFO({
      frequency: "1m",
      min: 200,
      max: 2500
    }).start()
    lfo.connect(filter.frequency)

    synth.connect(filter)
    // filter.connect(chorus)
    // chorus.connect(delay)
    filter.connect(reverb)

    //delay.connect(reverb)

    function playNewSequence() {
      if (currentPart) currentPart.dispose()
      let tempoAdjustment = Math.floor(Math.random() * 10) - 5
      Tone.getTransport().bpm.value += tempoAdjustment

      synth.set({ oscillator: { type: randomWaveform() } })

      currentPart = new Tone.Part((time, event) => {
        synth.triggerAttackRelease(event.note, event.duration, time)
      }, randomSequence(8))

      currentPart.start(Tone.getTransport().position)

    }
    const loop = new Tone.Loop(() => {
      playNewSequence()
    }, sequenceLength)

    Tone.getTransport().bpm.value = 55
    loop.start(0)
    playNewSequence()
    Tone.getTransport().start()

    setStarted(true)
  }

  return (
    <button onClick={handleStart}>
      {started ? "Musik spiller" : "Start musik"}
    </button>

  )
}

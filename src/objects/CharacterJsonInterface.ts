import WaveData from "./waveDataInterface";

export default interface CharacterJson {
    id: number
    name: string
    avatar: number
    avatarAnim: number[]
    life: number
    spritesheet: string[]
    wave: string
    waveHd: string
    comboLimit: number
    waveData: WaveData
}
import { Memory } from './Memory'
import { ScoreResponse, ScoreInput } from './Score'

export enum DialogMode {
  Extractor = 'Extract', // Waiting for Extractor feedback
  Scorer = 'Score', // Waiting for Scorer feedback
  Wait = 'Wait' // Waiting for user input
}

export interface Teach {
  teachId: string
  trainDialogId: string
  createdDatetime: string | undefined
  lastQueryDatetime: string | undefined
  packageId: number | undefined
}

export interface TeachResponse {
  packageId: number
  teachId: string
  trainDialogId: string
}

export interface TeachList {
  teaches: Teach[]
}

export interface TeachIdList {
  teachIds: string[]
}

export interface TeachWithHistory {
  teach: Teach
  history: any[]
  memories: Memory[]
  prevMemories: Memory[]
  dialogMode: DialogMode
  scoreResponse: ScoreResponse
  scoreInput: ScoreInput
  discrepancies: string[]
}

import { apiClient } from '@/lib/api-client'
import { 
  PresentationConfig, 
  GenerationProgress, 
  Presentation,
  ExportOptions,
  ExportHistory,
  Collaborator
} from '@/types'
import { mockPresentation, mockExportHistory } from '@/lib/mock-data'

export interface CreatePresentationRequest {
  content?: string
  file?: File
  config: PresentationConfig
}

export interface CreatePresentationResponse {
  generationId: string
  estimatedTime: number
  websocketUrl?: string
}

class PresentationService {
  private baseUrl = '/presentations'

  async createPresentation(data: CreatePresentationRequest): Promise<CreatePresentationResponse> {
    const formData = new FormData()
    
    if (data.content) {
      formData.append('content', data.content)
    }
    
    if (data.file) {
      formData.append('file', data.file)
    }
    
    formData.append('config', JSON.stringify(data.config))

    const response = await apiClient.post(`${this.baseUrl}/generate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  }

  async getGenerationStatus(generationId: string): Promise<GenerationProgress> {
    const response = await apiClient.get(`${this.baseUrl}/generation/${generationId}/status`)
    return response.data
  }

  async cancelGeneration(generationId: string): Promise<void> {
    await apiClient.post(`${this.baseUrl}/generation/${generationId}/cancel`)
  }

  async retryGeneration(generationId: string): Promise<void> {
    await apiClient.post(`${this.baseUrl}/generation/${generationId}/retry`)
  }

  async getPresentation(presentationId: string): Promise<Presentation> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/${presentationId}`)
      return response.data
    } catch (error) {
      // Return mock data for development
      console.log('Using mock data for presentation')
      return mockPresentation
    }
  }

  async updatePresentation(presentationId: string, data: Partial<Presentation>) {
    const response = await apiClient.put(`${this.baseUrl}/${presentationId}`, data)
    return response.data
  }

  async deletePresentation(presentationId: string) {
    await apiClient.delete(`${this.baseUrl}/${presentationId}`)
  }

  async listPresentations(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
  }) {
    const response = await apiClient.get(this.baseUrl, { params })
    return response.data
  }

  // Export methods
  async exportPresentation(
    presentationId: string, 
    options: ExportOptions
  ): Promise<{ url?: string; message?: string }> {
    const response = await apiClient.post(
      `${this.baseUrl}/${presentationId}/export`,
      options
    )
    return response.data
  }

  async getExportHistory(presentationId: string): Promise<ExportHistory[]> {
    try {
      const response = await apiClient.get(
        `${this.baseUrl}/${presentationId}/exports`
      )
      return response.data
    } catch (error) {
      // Return mock data for development
      console.log('Using mock export history')
      return mockExportHistory
    }
  }

  // Collaboration methods
  async getCollaborators(presentationId: string): Promise<Collaborator[]> {
    const response = await apiClient.get(
      `${this.baseUrl}/${presentationId}/collaborators`
    )
    return response.data
  }

  async addCollaborator(
    presentationId: string,
    email: string,
    role: 'viewer' | 'editor'
  ): Promise<Collaborator> {
    const response = await apiClient.post(
      `${this.baseUrl}/${presentationId}/collaborators`,
      { email, role }
    )
    return response.data
  }

  async removeCollaborator(
    presentationId: string,
    collaboratorId: string
  ): Promise<void> {
    await apiClient.delete(
      `${this.baseUrl}/${presentationId}/collaborators/${collaboratorId}`
    )
  }

  async updateCollaborator(
    presentationId: string,
    collaboratorId: string,
    role: 'viewer' | 'editor'
  ): Promise<Collaborator> {
    const response = await apiClient.patch(
      `${this.baseUrl}/${presentationId}/collaborators/${collaboratorId}`,
      { role }
    )
    return response.data
  }
}

export const presentationService = new PresentationService()
import instance from "../../../shared/api/instance";

// 요청 데이터 타입 정의
interface CreateStudyRequest {
  nickName: string;
  studyName: string;
  introduce: string;
  background: string;
  password: number;
}

// 응답 데이터 구조 정의
interface StudyData {
  studyId: number;
  createdAt: string;
  nickName: string;
  studyName: string;
  introduce: string;
  background: string;
}

// 응답 데이터 타입 정의
interface CreateStudyResponse {
  success: boolean;
  message: string;
  data: StudyData;
}

export const createStudy = async ({
  nickName,
  studyName,
  introduce,
  background,
  password,
}: CreateStudyRequest): Promise<CreateStudyResponse> => {
  try {
    const response = await instance.post<CreateStudyResponse>(
      `/api/detailPage/create`,
      {
        nickName,
        studyName,
        introduce,
        background,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating study:", error);
    throw new Error("Failed to create study"); // 명확한 에러 처리
  }
};

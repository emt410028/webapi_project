from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import ChatMessage
from .serializers import ChatMessageSerializer
from .llm import call_ollama  

class ChatView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        回傳目前使用者的聊天紀錄
        """
        messages = ChatMessage.objects.filter(user=request.user).order_by("created_at")
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        接收使用者訊息 → 呼叫 Ollama → 存入資料庫
        """
        user_message = request.data.get("message")
        if not user_message:
            return Response({"error": "缺少 message"}, status=status.HTTP_400_BAD_REQUEST)

        # 存使用者訊息
        ChatMessage.objects.create(user=request.user, role="user", content=user_message)

        # 呼叫 Ollama（從外部模組）
        bot_reply = call_ollama(user_message)

        # 存機器人回覆
        ChatMessage.objects.create(user=request.user, role="assistant", content=bot_reply)

        return Response({"reply": bot_reply}, status=status.HTTP_200_OK)
"use client";

import { useTransition } from "react";
import { deleteAccountAction } from "../api/actions";
import { Button } from "@/shared/ui/Button";

type Props = { userId: string; username: string };

export function DeleteAccountButton({ userId, username }: Props) {
  const [pending, start] = useTransition();

  function handleClick() {
    const ok = window.confirm(`"${username}" 계정을 삭제하시겠습니까?`);
    if (!ok) return;
    const fd = new FormData();
    fd.set("userId", userId);
    start(() => deleteAccountAction(fd));
  }

  return (
    <Button
      type="button"
      variant="danger"
      size="sm"
      onClick={handleClick}
      disabled={pending}
    >
      {pending ? "deleting…" : "revoke"}
    </Button>
  );
}

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function SwalAlert({
  title = "Are you sure?",
  text = "Action can't be undone!",
  icon = "warning",
  showCancelButton = true,
  confirmButtonText = "Yes, continue!",
  ...rest
} = {}) {
  return MySwal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonText,
    ...rest,
  });
}

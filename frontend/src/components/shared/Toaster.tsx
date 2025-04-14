import { Toaster as DefaultToaster, ToastBar, toast } from 'react-hot-toast'
import { Button } from './Button'

const Toaster = () => {
  return (
    <DefaultToaster
      toastOptions={{
        style: { fontWeight: 'bold' },
        success: {
          icon: null,
          className: '!bg-green-400',
        },
        error: {
          icon: null,
          className: '!bg-red-400',
        }
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <Button
                  buttonSize="none"
                  className="pr-2"
                  variant="ghost"
                  onClick={() => toast.dismiss(t.id)}
                >
                  X
                </Button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </DefaultToaster>
  )
}

export default Toaster

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"

export function MatchingModal({ open, onClose, fileName, onShowResults }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Matching Started!</DialogTitle>
          <DialogDescription>
            Matching process has been initiated for <b>{fileName}</b>.  
            We will update the status of this matching on the "Result Page" once it's completed.  
            <br /><br />
            You can also check the results manually using the button below:
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center mt-4">
          <Button onClick={onShowResults} className="bg-green-600 hover:bg-green-700 text-white">
            Show Result Page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

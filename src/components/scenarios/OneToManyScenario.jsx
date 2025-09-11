import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ArrowUpRight, Construction } from "lucide-react"

export default function OneToManyScenario() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <ArrowUpRight className="w-8 h-8 text-green-600" />
            <span>1:Many AP Invoice Processing</span>
          </h2>
          <p className="text-gray-600 mt-2">Process one invoice against multiple GRNs (Coming Soon)</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Construction className="w-5 h-5 text-orange-500" />
            <span>Feature Under Development</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Construction className="w-16 h-16 mx-auto mb-4 text-orange-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">1:Many Processing Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              This feature will allow you to match a single invoice against multiple Goods Receipt Notes (GRNs) for
              complex procurement scenarios.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

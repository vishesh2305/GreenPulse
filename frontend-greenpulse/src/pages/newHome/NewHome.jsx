import { Card, CardHeader, Navbar } from '@material-tailwind/react'
import React from 'react'
import MyNavbar from '../../components/Navbar'
import { SidebarWithCta } from '../../components/Sidebar'
import { CardContent } from '@mui/material'
import { Label } from '@mui/icons-material'
import { Input } from 'postcss'

const NewHome = () => {
  return (
    <div className='w-full min-w-full'>
        <MyNavbar/>
        <SidebarWithCta/>
        <Card className="w-[350px]">
      <CardHeader>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default NewHome

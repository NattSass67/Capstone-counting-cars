import { TabsProps } from '@/models'
import { Label, Radio, RadioGroup, RadioGroupProps } from '@headlessui/react'
import { ReactNode } from 'react'

export const TabItem = Radio

export const TabsGroup = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => <div className={className}>{children}</div>

export const TabsLabel = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => <Label className={className}>{children}</Label>

const TabsContainer = ({
  children,
  className,
  currentTab,
  onChange,
  ...props
}: {
  children: ReactNode
  className?: string
} & Pick<TabsProps, 'currentTab'> &
  RadioGroupProps) => (
  <RadioGroup
    value={currentTab}
    onChange={onChange}
    className={className}
    {...props}
  >
    {children}
  </RadioGroup>
)

export default function Tabs({
  onChange,
  currentTab,
  children,
  className,
}: TabsProps & { children: ReactNode; className?: string }) {
  return (
    <TabsContainer
      currentTab={currentTab}
      onChange={onChange}
      className={className}
    >
      {children}
    </TabsContainer>
  )
}
